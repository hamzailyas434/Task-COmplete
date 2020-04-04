import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService, AuthService, StorageService, GlobalConstants } from '../../shared';

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //rememberMe: boolean;
  buttonName: any = true;
  btnSub:boolean=true;
  loading :boolean=false;
  login: FormGroup;
  error:boolean = false;
  token: string="";
  active: boolean = false;
  notActive:boolean = false;

  changeClass:string = "fa fa-eye";

  rememberMeCheck:boolean = false;
  userInfo:any;
  message: string;
  sub: any;
  constructor(
    private router: Router,
    public global: GlobalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: StorageService,
    private route: ActivatedRoute

) {



    this.login = formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,4})$/)])],
        'password': [null, Validators.compose([Validators.required])]
    });

}

  ngOnInit() {
    
  
  }
   // for checking javascript object is empty or not
   isEmpty(obj: any) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
// to clear params
clearParam() {
  this.router.navigate(
    ['.'], 
    { relativeTo: this.route}
  );
}
  submitForm(form:any){
    this.btnSub=false; 
    this.loading=true;

    this.error = false;
    
    this.authService.authenticateUser(form)
    .subscribe((response)=>{
        this.storage.setLocalStorage(GlobalConstants.TEST_USER,response._body);
        this.userInfo = JSON.parse(response._body);
        this.getUserDetails();
        this.RememberMe();
        this.router.navigate(['/dashboard']);
    },
    (error)=>{
      this.error = true;
    //  if(error.status === '401'){
    //   this.message = "Invalid Login or password.";
    //   }else if(error.status === '403'){
    //     this.message = "Please activate your account.";
    //   }
      this.message = "Invalid Login or password.";
      this.btnSub=true; 
      this.loading=false;
    });
  }

// get user details
getUserDetails() {
  this.authService.getUser()
    .subscribe((response) => {
     
      this.storage.setLocalStorage(GlobalConstants.USER_DETAILS,JSON.stringify(response));
      // this.storage.setLocalStorage(GlobalConstants.USER_NAME,response.firstName + ' '+ response.lastName);
  
    },
      (error) => {
        console.log(error);
      });
}



  hideError(){
    this.error = false;
  }
  onKeyUp(event: any) {
    let caps = event.getModifierState && event.getModifierState('CapsLock');
    if (caps) {
        $('#txtpassword').attr("title", "Caps Lock is ON");
        $('#txtpassword').tooltip('show');
    } else {
        $('#txtpassword').tooltip('hide');
        $('#txtpassword').attr("title", "");
    }
    
}

onBlur() {
    $('#txtpassword').tooltip('hide');
    $('#txtpassword').attr("title", "");
    $('#txtpassword').val($('#txtpassword').val().trim());
}
//Remember Me
RememberMe(){
  debugger
  if(this.rememberMeCheck){
    // if(this.login.controls.email.value !== null && this.login.controls.password.value !== null)
    if(this.login.controls.email.value !== null){
      var obj = {
        email:this.login.controls.email.value,
        password:this.login.controls.password.value
      };
      localStorage.setItem(GlobalConstants.REMEMBER_ME,JSON.stringify(obj));
    }
  }else{
    localStorage.removeItem(GlobalConstants.REMEMBER_ME);
  }
}

ngAfterViewInit(){
    //binding remember me 
    if(localStorage.getItem(GlobalConstants.REMEMBER_ME) !== null){
      let obj = JSON.parse(localStorage.getItem(GlobalConstants.REMEMBER_ME));
      this.login.controls.email.setValue(obj.email);
      this.login.controls.password.setValue(obj.password);
      this.rememberMeCheck = true;
    }
}


//changing  password view
changePasswordView(){
  if($("#txtpassword").attr("type") === "password"){
    $("#txtpassword").attr("type","text");
    this.changeClass = "fa fa-eye-slash";
  }else{
    $("#txtpassword").attr("type","password");
    this.changeClass = "fa fa-eye";
  }
}

}
