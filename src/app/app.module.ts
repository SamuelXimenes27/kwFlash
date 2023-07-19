import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SchoolsComponent } from './schools/schools.component';
import { HomeComponent } from './home/home.component';
import { ActivityService } from './services/activities.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';

const routes: Routes = [
  { path: 'activities', component: ActivitiesComponent },
  { path: 'schools', component: SchoolsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    SchoolsComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
