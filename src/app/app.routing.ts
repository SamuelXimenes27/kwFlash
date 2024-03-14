import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home/home-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/home/home-layout.module').then(x => x.DashboardLayoutModule)
            }
        ]
    }
];
