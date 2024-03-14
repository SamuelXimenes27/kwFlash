import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterTitleSubject = new BehaviorSubject<string>('');

  constructor() { }

  setFilterTitle(title: string): void {
    console.log(title);
    this.filterTitleSubject.next(title);
  }

  getFilterTitle(): BehaviorSubject<string> {
    return this.filterTitleSubject;
  }
}
