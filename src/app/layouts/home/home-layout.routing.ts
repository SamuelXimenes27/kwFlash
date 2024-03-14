import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AddActivityComponent } from "../../pages/add-activity/add-activity.component";
import { AddSchoolComponent } from "../../pages/add-school/add-school.component";
import { SeeActivityComponent } from "../../pages/see-activity/see-activity.component";
import { EditActivityComponent } from "../../pages/edit-activity/edit-activity.component";

export const HomeLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-activity', component: AddActivityComponent },
    { path: 'see-activity/:id', component: SeeActivityComponent },
    { path: 'edit-activity/:id', component: EditActivityComponent },
    { path: 'add-school', component: AddSchoolComponent },
]