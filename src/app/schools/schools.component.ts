import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { School } from '../models/school.model';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  newSchool: School = new School();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  addSchool(schoolName: string): void {
    const schoolData = { title: schoolName };

    this.http.post('https://64b5a247f3dbab5a95c78c9f.mockapi.io/Schools', schoolData)
      .subscribe(
        {
          next: (v) => {
            this.router.navigate(['/']);
          },
          error: (e) => console.error('Erro ao adicionar escola:', e),
        }
      );
  }
}
