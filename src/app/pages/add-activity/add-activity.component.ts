import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activities.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SchoolsService } from '../../shared/services/schools.service';
import { School } from '../../shared/models/school.model';

@Component({
  imports: [FormsModule, NgIf, NgFor],
  standalone: true,
  selector: 'add-activity-cmp',
  moduleId: module.id,
  templateUrl: './add-activity.component.html',
})
export class AddActivityComponent implements OnInit {
  newActivity: any = { schoolId: '', typeActivitie: '' };
  isSubmitted: boolean = false;
  schools: School[] = [];

  constructor(
    public activityService: ActivityService,
    public schoolsService: SchoolsService,
  ) { }

  ngOnInit() {
    this.getSchoolsDropdown();
  }

  addActivity() {
    this.isSubmitted = true;
    this.activityService.addActivity(this.newActivity);
  }

  getSchoolsDropdown() {
    this.schoolsService.getSchools().subscribe(data => {
      this.schools = data;
    });
  }
}
