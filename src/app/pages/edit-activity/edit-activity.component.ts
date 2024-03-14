import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../shared/models/activities.model';
import { ActivityService } from '../../shared/services/activities.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { School } from '../../shared/models/school.model';
import { SchoolsService } from '../../shared/services/schools.service';

@Component({
  imports: [FormsModule, NgIf, NgFor],
  selector: 'edit-activity-cmp',
  templateUrl: './edit-activity.component.html',
  moduleId: module.id,
  standalone: true,
})
export class EditActivityComponent implements OnInit {
  activityId: number;
  activity: Activity;
  schools: School[] = [];
  isSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    public notifications: NotificationsService,
    public schoolsService: SchoolsService,
  ) {
    this.activityId = 0;
    this.activity = {} as Activity;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activityId = +params['id'];
      this.activityService.getActivityById(this.activityId).subscribe(activity => {
        this.activity = activity;
      });
      this.getSchoolsDropdown();
    });

  }

  updateActivity() {
    this.isSubmitted = true;
    this.activityService.updateActivityById(this.activityId, this.activity);
  }

  getSchoolsDropdown() {
    this.schoolsService.getSchools().subscribe(data => {
      this.schools = data;
    });
  }
}
