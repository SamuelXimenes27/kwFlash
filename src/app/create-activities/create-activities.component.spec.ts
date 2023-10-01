import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './create-activities.component';

describe('CreateActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesComponent]
    });
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
