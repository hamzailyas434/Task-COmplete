import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants';
import { StorageService } from './storage.service';
@Injectable()
export class GlobalService {

  private tokenValue: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MTBhODVlYS1iZTE3LTQ3NDItYjBkMy0wZGJhOGVhMmNmYTkiLCJpYXQiOjE1ODU4NDk3ODIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJSb290IFJvb3QiLCJDaGFuZ2VQYXNzd29yZCI6IkZhbHNlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJFbWV0dGlfZG9jdW1lbnRvIjoiIiwiR2VzdGlvbmVfbWFnYXp6aW5vIjoiIiwiR2VzdGlvbmVfcGFsbWFyaSI6IiIsIkdlc3Rpb25lX2ZhdHR1cmF6aW9uZV9lbGV0dHJvbmljYSI6IiIsIkdlc3Rpb25lX3V0ZW50aSI6IiIsIkdlc3Rpb25lX2NvbnRvIjoiIiwiR2VzdGlvbmVfbWVudSI6IiIsIkdlc3Rpb25lX3Rhdm9saSI6IiIsIkRpc2F0dGl2YV9zdGFtcGEiOiIiLCJSaXN0YW1wYV9jb21hbmRhIjoiIiwiTW9kaWZpY2FfcHJvZG90dG8iOiIiLCJUcmFzZmVyaXNjaV90YXZvbG8iOiIiLCJVbmlzY2lfdGF2b2xvIjoiIiwiSW5mb19UYXZvbGkiOiIiLCJDaGl1c3VyYV9HaW9ybmFsaWVyYSI6IiIsIkRlY3JlbWVudGFfUXVhbnRpdGEiOiIiLCJEZWNyZW1lbnRhX1ZhbG9yZSI6IiIsIkNhbmNlbGxhX3Byb2RvdHRvIjoiIiwiQXBwbGljYV9vZmZlcnRvIjoiIiwiQXBwbGljYV9saXN0aW5pIjoiIiwiQXBwbGljYV9zY29udG8iOiIiLCJSaXByaXN0aW5hX2RvY3VtZW50byI6IiIsIkdlc3Rpb25lX2FjY291bnQiOiIiLCJHZXN0aW9uZV90b3VjaCI6IiIsImxpY2Vuc2UgRXhwaXJ5RGF0ZSI6IjAiLCJsaWNlbnNlIFN1YnNjcmlwdGlvblR5cGUiOiItMjE0NzQ4MzY0OCIsIm5iZiI6MTU4NTg0OTc4MiwiZXhwIjoxNTkwMTY5NzgyLCJpc3MiOiJUZXN0IiwiYXVkIjoiVGVzdCJ9.gx1bQTqsEeXY5D0ESzyPmgVpyHvqnvAPlVKCLaFfei8';
  public userName:any;
  settings: any;
 
  constructor(private storage: StorageService) {
    
   }
   
//token getter
   get token(): string {
    let userdata= (JSON.parse( this.storage.getLocalStorage(this.settings.TEST_USER)));
      let user =(userdata==null)?'': userdata["tokenString"];
      if (user != null) {
          this.tokenValue = user;
      } else {
          this.tokenValue = '';
      }
      return this.tokenValue;
  }

 

 
 
}