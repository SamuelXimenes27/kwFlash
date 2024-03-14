import { Component, Input, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activities.service';
import { Activity } from '../../shared/models/activities.model';
import { School } from '../../shared/models/school.model';
import { SchoolsService } from '../../shared/services/schools.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { FilterService } from '../../shared/services/filter.service';
import { UpdateRoleService } from '../../shared/services/update-role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  activities: Activity[] = [];
  schools: School[] = [];
  loading = true;
  completedRequests = 0;
  filterTitle: string;
  public roleValue: string | undefined;
  adminPassword: string = '';
  deleteModalOpen: boolean;
  deleteActivityId: number;
  isSubmitted: boolean = false;

  constructor(
    public activityService: ActivityService,
    public schoolService: SchoolsService,
    public notifications: NotificationsService,
    private filterService: FilterService,
    public updateRole: UpdateRoleService,
    private modalService: NgbModal
  ) {
    this.filterTitle = '';
    this.adminPassword = '';
    this.deleteModalOpen = false;
    this.deleteActivityId = 0;
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe({
      next: (data: Activity[]) => {
        this.activities = data;
        this.schoolService.updateSchoolTitles(this.filterTitle, this.activities);
      },
      error: (error) => {
        this.notifications.showNotification('Erro ao obter atividades', "error", "bottom-right");
      },
      complete: () => {
        this.loading = false;
      }
    });

    this.filterService.getFilterTitle().subscribe(title => {
      this.filterTitle = title;
      this.activityService.filterActivities(this.filterTitle, this.activities);
    });

    this.updateRole.role$.subscribe(value => {
      this.roleValue = value;
    });
  }

  onSearchChange(): void {
    this.filterService.setFilterTitle(this.filterTitle);
  }
  isRoleAdmin(): boolean {
    return this.roleValue === 'Admin';
  }

  openDeleteConfirmationPopup(content: any, activity: Activity) {
    if (activity) {
      this.deleteActivityId = activity.id;
    }
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'confirm' && this.adminPassword === 'flashalgarve') {
          this.activityService.deleteActivity(this.deleteActivityId);
        }
        else if (result === 'confirm' && this.adminPassword !== 'flashalgarve') {
          this.notifications.showNotification('A senha digitada está errada', "warning", "bottom-right")
        }
        else {
          this.notifications.showNotification('Erro ao excluir', "error", "bottom-right")
        }
      },
    );
  }

  confirmDeleteActivity(modal: any): void {
    if (!this.adminPassword) {
      this.isSubmitted = true;
      return;
    }

    modal.close('confirm');
  }
}
