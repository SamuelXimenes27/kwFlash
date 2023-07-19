import { Injectable } from '@angular/core';
import { Activity } from '../models/activities.model';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private activities: Activity[] = [];

    constructor() { }

    getActivities(): Activity[] {
        return this.activities;
    }

    addActivity(activity: Activity): void {
        this.activities.push(activity);
    }
}
