import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Activity } from '../models/activities.model';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  filterTitle: string = '';
  isAddActivityPopupOpen = false;
  isDeleteConfirmationPopupOpen = false;
  newActivity: Activity = new Activity();
  editedActivity: Activity = new Activity();
  deleteActivityId: number | null = null;
  schools: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'startDate', 'schoolId', 'actions'];


  loading = true;

  adminPassword: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    forkJoin([this.getActivities(), this.getSchools()]).subscribe(() => {
      this.loading = false;
    });
  }



  closeAddActivityPopup() {
    this.isAddActivityPopupOpen = false;
  }

  addActivity() {
    if (!this.newActivity.title || !this.newActivity.startDate || !this.newActivity.endDate || !this.newActivity.schoolId || !this.newActivity.description || !this.newActivity.typeActivitie) {
      return;
    }

    this.http.post('https://64b5a247f3dbab5a95c78c9f.mockapi.io/Activities', this.newActivity)
      .subscribe(
        {
          next: (v) => {
            this.getActivities();
            this.closeAddActivityPopup();
          },
          error: (e) => console.error('Erro ao adicionar atividade:', e),
        }
      );
  }


  saveEditedActivity() {
    if (!this.editedActivity.title || !this.editedActivity.startDate || !this.editedActivity.endDate || !this.editedActivity.schoolId || !this.editedActivity.description || !this.editedActivity.typeActivitie) {
      return;
    }
    this.http.put(`https://64b5a247f3dbab5a95c78c9f.mockapi.io/Activities/${this.editedActivity.id}`, this.editedActivity)
      .subscribe(
        {
          next: (v) => {
            this.getActivities();
            this.modalService.dismissAll();
          },
          error: (e) => console.error('Erro ao atualizar atividade:', e),
        }
      );
  }

  deleteActivity() {
    if (this.deleteActivityId !== null) {
      this.http.delete(`https://64b5a247f3dbab5a95c78c9f.mockapi.io/Activities/${this.deleteActivityId}`)
        .subscribe(
          {
            next: (v) => {
              this.getActivities();
              this.deleteActivityId = null;
            },
            error: (e) => console.error('Erro ao excluir atividade:', e),
          }
        );
    }
  }

  getActivities() {
    return this.http.get<Activity[]>('https://64b5a247f3dbab5a95c78c9f.mockapi.io/Activities')
      .pipe(tap({
        next: (v) => {
          this.activities = v;
          this.filterActivities();
        },
        error: (e) => console.error('Erro ao obter atividades:', e),
      }));
  }

  getSchools() {
    return this.http.get<any[]>('https://64b5a247f3dbab5a95c78c9f.mockapi.io/Schools')
      .pipe(tap({
        next: (v) => {
          this.schools = v.map(school => ({ id: school.id, title: school.title }));
        },
        error: (e) => console.error('Erro ao obter escolas:', e),
      }));
  }

  filterActivities(): void {
    this.filteredActivities = this.activities.filter(activity =>
      activity.title.toLowerCase().includes(this.filterTitle.toLowerCase())
    );
  }

  openAddActivityPopup(content: any) {
    this.isAddActivityPopupOpen = true;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'save') {
          this.addActivity();
        }
      },
      (reason) => {
      }
    );
  }

  openEditActivityPopup(content: any, activity?: Activity) {
    if (activity) {
      this.editedActivity = { ...activity };
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'save') {
          this.saveEditedActivity();
        }
      },
      (reason) => {
      }
    );
  }

  openDeleteConfirmationPopup(content: any, activity: Activity) {
    if (activity) {
      this.deleteActivityId = activity.id;
    }
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'confirm' && this.adminPassword === 'flashalgarve') {
          this.deleteActivity();
        }
      },
      (reason) => {
        this.deleteActivityId = null;
      }
    );
  }

  editActivity(activity: Activity) {
    this.openEditActivityPopup(activity);
  }
}
