import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../shared/services/activities.service';
import { Activity } from '../../shared/models/activities.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolsService } from '../../shared/services/schools.service';

@Component({
  imports: [FormsModule, NgIf, NgFor],
  selector: 'see-activity-cmp',
  templateUrl: './see-activity.component.html',
  moduleId: module.id,
  standalone: true,
})
export class SeeActivityComponent implements OnInit {
  activityId: number;
  activity: Activity;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    public schoolService: SchoolsService,
  ) {
    this.activityId = 0;
    this.activity = {} as Activity;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityId = +params['id'];
      this.activityService.getActivityById(this.activityId).subscribe(activity => {
        this.activity = activity;
        this.schoolService.getSchoolTitle(activity);
      });
    });
  }
}
