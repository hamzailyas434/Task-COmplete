import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalConstants } from '../constants';

@Injectable(
    { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        let token = localStorage.getItem(GlobalConstants.TEST_USER);

        if (token !== null) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
