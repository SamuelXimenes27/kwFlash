import { Injectable } from '@angular/core';
import { School } from '../models/school.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { NotificationsService } from './notifications.service';
import { Activity } from '../models/activities.model';

@Injectable({
    providedIn: 'root'
})
export class SchoolsService {
    private schools: School[] = [];

    constructor(
        private http: HttpClient,
        private notifications: NotificationsService,
    ) { }


    getSchools(): Observable<School[]> {
        return this.http.get<School[]>(environment.apiKey + 'Schools')
            .pipe(tap({
                next: (schools) => {
                    this.schools = schools.map(school => ({ id: school.id, title: school.title }));
                },
                error: (e) => this.notifications.showNotification('Erro ao obter escolas', "error", "bottom-right"),
            }));
    }

    getSchoolById(id: string): Observable<School> {
        return this.http.get<School>(`${environment.apiKey}Schools/${id}`);
    }

    getSchoolTitle(activity: Activity): void {
        this.getSchoolById(activity.schoolId).subscribe({
            next: (school: School) => {
                activity.schoolId = school.title;
            },
            error: (error) => {
                this.notifications.showNotification('Erro ao obter título da escola', "error", "bottom-right");
            }
        });
    }

    addSchool(school: School) {
        const schoolData = { title: school };
        if (!school.title) {
            return;
        }

        this.http.post(environment.apiKey + 'Schools', schoolData.title)
            .subscribe(
                {
                    next: (v) => {
                        this.notifications.showNotification('Escola adicionada com sucesso', "success", "bottom-right")
                    },
                    error: (e) => this.notifications.showNotification('Erro ao adicionar escola:', "error", "bottom-right"),
                }
            );
    }

    updateSchoolTitles(filterTitle: string, activities: Activity[]): void {
        if (filterTitle.trim() === '') {
            activities.forEach((activity, index) => {
                this.getSchoolById(activity.schoolId).subscribe({
                    next: (school: School) => {
                        activities[index].schoolId = school.title;
                        // completedRequests++;
                        // if (completedRequests === activities.length) {
                        //     loading = false;
                        // }
                    },
                    error: (error) => {
                        this.notifications.showNotification('Erro ao obter título da escola', "error", "bottom-right")
                        // completedRequests++;
                        // if (completedRequests === activities.length) {
                        //     loading = false;
                        // }
                    }
                });
            });
        } else {
            // loading = false;
        }
    }

}