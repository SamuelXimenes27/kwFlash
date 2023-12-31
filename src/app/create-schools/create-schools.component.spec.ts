import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsComponent } from './create-schools.component';

describe('SchoolsComponent', () => {
  let component: SchoolsComponent;
  let fixture: ComponentFixture<SchoolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolsComponent]
    });
    fixture = TestBed.createComponent(SchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
