import { Injectable } from '@angular/core';
import { School } from '../models/school.model';

@Injectable({
    providedIn: 'root'
})
export class SchoolsService {
    private schools: School[] = [];

    constructor() { }

    getSchools(): School[] {
        return this.schools;
    }

    addSchool(school: School): void {
        this.schools.push(school);
    }

}