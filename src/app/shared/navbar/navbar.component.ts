import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { UpdateRoleService } from '../services/update-role';
import { FilterService } from '../services/filter.service';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[] | undefined;
  location: Location;
  public roleValue: string | undefined;
  public isCollapsed = true;

  filterTitle = '';

  @ViewChild("navbar-cmp", { static: false }) button: any;

  constructor(location: Location,
    private updateRole: UpdateRoleService,
    private filterService: FilterService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.updateRole.role$.subscribe(value => {
      this.roleValue = value;
    });

  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles!.length; item++) {
      if (this.listTitles![item].path === titlee) {
        return this.listTitles![item].title;
      }
    }
    return 'Dashboard';
  }

  toggleSwitch(): void {
    const newValue = this.roleValue === 'Padrão' ? 'Admin' : 'Padrão';
    this.updateRole.setRole(newValue);
  }

  onSearchChange(): void {
    this.filterService.setFilterTitle(this.filterTitle);
  }

}
