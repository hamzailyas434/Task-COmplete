import { Injectable, Inject, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { GlobalConstants } from '..';

@Injectable()

export class Interceptor implements HttpInterceptor {

    constructor(public inj: Injector, private router: Router) { }

    //setting header globally
    private applyCredentials = (req: HttpRequest<any>, token: string) => {
        return req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            }
        });
    }

    //intercepting request to find if token is expired or not
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //debugger
        //logout in-case of expired and premium to free check
        //else do nothing
        
        //getting global service
        const global = this.inj.get(GlobalService);

        //passing token to applyCredentials function
        const authReq = this.applyCredentials(req, global.token);

        //handling request
        return next.handle(authReq)
            .pipe(map((event: HttpEvent<any>) => {
                //debugger;
                //returning response on request success
                if (event instanceof HttpResponse) {
                    return event;
                }

            }),
            catchError((error: any) => {
                //debugger;
                //handling error 
                if (error instanceof HttpErrorResponse) {
                       
                    //if error is 401 unauthorized
                    if(error.status === 401){
                        localStorage.removeItem(GlobalConstants.TEST_USER)
                        this.router.navigate(['/login']);
                        
                    }
                    return throwError(error);
                    // if (error.status === 401) {
                    //     //getting refresh token
                    //     let t = global.unAuthorize();
                    //     if (t === true) {
                    //         //call back
                    //         return next.handle(this.applyCredentials(req, global.token));
                    //     }
                    // } else if (error.status === 403) {
                    //     //if refreshtoken is invalid redirect to login
                    //     global.checkAuthorize();
                    // }
                } else {
                    return throwError(error);
                }
            })
            )

            
    }
}
