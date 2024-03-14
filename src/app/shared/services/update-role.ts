import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateRoleService {
  private roleSubject = new BehaviorSubject<string>('Padrão');
  role$ = this.roleSubject.asObservable();

  constructor() { }

  getRole(): string {
    return this.roleSubject.getValue();
  }

  setRole(role: string): void {
    this.roleSubject.next(role);
  }
}
