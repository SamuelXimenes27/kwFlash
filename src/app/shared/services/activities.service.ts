import { Injectable } from '@angular/core';
import { Activity } from '../models/activities.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../enviroment/environment'
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { SchoolsService } from './schools.service';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(
        private http: HttpClient,
        private notifications: NotificationsService,
        private schoolsService: SchoolsService,
        private router: Router
    ) { }

    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(environment.apiKey + 'Activities')
            .pipe(
                tap(
                    {
                        next: (activities) => {
                        },
                        error: (error) => console.error('Erro ao obter atividades:', error)
                    })
            );
    }

    getActivityById(activityId: number): Observable<Activity> {
        return this.http.get<Activity>(`${environment.apiKey}Activities/${activityId}`)
            .pipe(
                tap(
                    {
                        next: (activity) => {
                        },
                        error: (error) => console.error('Erro ao obter atividade por ID:', error)
                    })
            );
    }


    addActivity(newActivity: Activity): void {

        if (!newActivity.title || !newActivity.startDate || !newActivity.endDate || !newActivity.schoolId || !newActivity.description || !newActivity.typeActivitie) {
            return;
        }

        this.http.post(environment.apiKey + 'Activities' + '/', newActivity)
            .subscribe(
                {
                    next:
                        (v) => {
                            this.notifications.showNotification('Atividade adicionada com sucesso', "success", "bottom-right")
                        },
                    error:
                        (e) => {
                            this.notifications.showNotification('Erro ao adicionar atividade', "error", "bottom-right")
                            throw e;
                        },
                    complete: () => {
                        this.router.navigate(['/']);
                    }
                }
            );
    }

    updateActivityById(activityId: number, updatedActivity: Activity): void {
        if (!updatedActivity.title || !updatedActivity.startDate || !updatedActivity.endDate || !updatedActivity.schoolId || !updatedActivity.description || !updatedActivity.typeActivitie) {
            return;
        }

        this.http.put(`${environment.apiKey}Activities/${activityId}`, updatedActivity)
            .subscribe(
                {
                    next: (v) => {
                        this.notifications.showNotification('Atividade atualizada com sucesso', "success", "bottom-right")
                    },
                    error: (e) => {
                        this.notifications.showNotification('Erro ao atualizar atividade', "error", "bottom-right")

                    },
                    complete: () => {
                        this.router.navigate(['/']);
                    }
                }
            );
    }

    deleteActivity(activityId: number): void {
        if (!activityId) {
            this.notifications.showNotification('ID da atividade inválido:', "error", "bottom-right")
            return;
        }

        this.http.delete(environment.apiKey + `/Activities/${activityId}`)
            .subscribe({
                next: (v) => {
                    this.notifications.showNotification('Atividade excluída com sucesso', "success", "bottom-right")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
                error: (error) => {
                    this.notifications.showNotification('Erro ao excluir atividade:' + error, "error", "bottom-right")
                }
            });
    }

    filterActivities(filterTitle: string, activities: Activity[]): void {
        if (filterTitle.trim() !== '') {
            activities = activities.filter(activity => {
                return activity.title.toLowerCase().includes(filterTitle.toLowerCase());
            });
        } else {
            this.getActivities().subscribe({
                next: (data: Activity[]) => {
                    activities = data;
                    this.schoolsService.updateSchoolTitles(filterTitle, activities);
                },
                error: (error) => {
                    console.error('Erro ao obter atividades:', error);
                }
            });
        }
    }
}
