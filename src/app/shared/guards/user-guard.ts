import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalConstants } from '../constants';

@Injectable(
    { providedIn: 'root' }
)
export class UserGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        let userDetails = JSON.parse(localStorage.getItem(GlobalConstants.TEST_USER))

        if (userDetails.userType === 'User') {
            this.router.navigate(['/dashboard']);
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
    
        }
    }
}
