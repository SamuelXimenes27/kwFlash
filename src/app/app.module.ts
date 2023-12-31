import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './create-activities/create-activities.component';
import { SchoolsComponent } from './create-schools/create-schools.component';
import { HomeComponent } from './home/home.component';
import { ActivityService } from './services/activities.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'create-activities', component: ActivitiesComponent },
  { path: 'create-schools', component: SchoolsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    SchoolsComponent,
    HomeComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      timeOut: 3000,
    }),
    
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
