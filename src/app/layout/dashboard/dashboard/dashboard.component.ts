import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService, AuthService, StorageService } from 'src/app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userArr:any[]=[];
  constructor(
    private router: Router,
    public global: GlobalService,
    private authService: AuthService,
    private storage: StorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser();
  }
   // get All users
   getUser(){
    this.authService.getUser()
    .subscribe((response)=>{
    
    this.userArr = response;
    console.log(this.userArr);
    },
    (error)=>{
      console.log(error);
    });
  }
}
