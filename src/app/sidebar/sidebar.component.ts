import { Component, OnInit } from '@angular/core';
import { UpdateRoleService } from '../shared/services/update-role';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/add-school', title: 'Adicionar Escola', icon: 'nc-hat-3', class: '' },
    { path: '/add-activity', title: 'Adicionar Atividade ', icon: 'nc-simple-add', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public roleValue: string | undefined;
    public menuItems: any[] | undefined;

    constructor(public updateRole: UpdateRoleService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.updateRole.role$.subscribe(value => {
            this.roleValue = value;
        });
    }

    isRoleAdmin(): boolean {
        return this.roleValue === 'Admin';
    }
}
