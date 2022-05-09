import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataManager, UrlAdaptor} from "@syncfusion/ej2-data";
import {EventSettingsModel} from "@syncfusion/ej2-angular-schedule";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {


  title = 'PharMaxWeb';
  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:8080/GetData',
    crudUrl: 'http://localhost:8080/BatchData',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = {dataSource: this.dataManager};
  public selectedDate: Date | undefined;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.selectedDate = new Date(2018, 1, 14);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
