import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";

import { AppRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { HomeLayoutComponent } from "./layouts/home/home-layout.component";

import { SidebarModule } from "./sidebar/sidebar.module";
import { NavbarModule } from './shared/navbar/navbar.module';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
        }),
        FormsModule,
        CommonModule,
        SidebarModule,
        NavbarModule,
        ToastrModule.forRoot(),
        HttpClientModule,
    ]
})
export class AppModule { }