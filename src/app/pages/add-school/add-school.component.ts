import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SchoolsService } from '../../shared/services/schools.service';

@Component({
  imports: [FormsModule, NgIf, NgFor],
  standalone: true,
  selector: 'add-school-cmp',
  moduleId: module.id,
  templateUrl: './add-school.component.html',
})
export class AddSchoolComponent implements OnInit {
  isSubmitted: boolean = false;
  newSchool: any = { title: '' };;

  constructor(
    public schoolsService: SchoolsService,
  ) { }

  ngOnInit() {

  }

  addNewSchool() {
    this.isSubmitted = true;
    this.schoolsService.addSchool(this.newSchool);

    if (this.newSchool.title != '') {
      this.newSchool = { title: '' };
      this.isSubmitted = false;
    }
  }
}
