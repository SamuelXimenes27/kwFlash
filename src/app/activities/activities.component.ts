import { Component, NgModule, OnInit } from '@angular/core';
import { Activity } from '../models/activities.model';
import { ActivityService } from '../services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activitiesService: ActivityService) { }

  ngOnInit(): void {
    this.activities = this.activitiesService.getActivities();
  }

  addActivity(activity: Activity): void {
    this.activitiesService.addActivity(activity);
  }

}


