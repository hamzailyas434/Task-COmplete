import { Component, OnInit } from '@angular/core';
import { GlobalService, StorageService, GlobalConstants } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router, public global:GlobalService, private storage: StorageService, private _global:GlobalService) { }

  ngOnInit() {
  }
  logOut(){
    this.storage.removeLocalStorage(GlobalConstants.TEST_USER);
    this.storage.removeLocalStorage(GlobalConstants.USER_DETAILS);
    this.storage.removeLocalStorage(GlobalConstants.USER_NAME);
    this.router.navigate(['/login']);
  }


}
