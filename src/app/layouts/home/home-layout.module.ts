import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeLayoutRoutes } from "./home-layout.routing";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { FilterPipe } from "../../shared/pipes/filter.pipe";
import { NgIconsModule } from "@ng-icons/core";
import { heroPencil, heroTrash, heroEye } from "@ng-icons/heroicons/outline";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeLayoutRoutes),
        NgbModule,
        FormsModule,
        NgIconsModule.withIcons({ heroPencil, heroTrash, heroEye }),

    ],
    declarations: [
        DashboardComponent,
        FilterPipe,
    ]
})
export class DashboardLayoutModule { }