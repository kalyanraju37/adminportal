import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //console.log('Jwt...'+currentUser);
        if (currentUser && currentUser.token) {
            //console.log('Jwt...'+currentUser.token);
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
        }
        else
        {
            request = request.clone({
                setHeaders: { 
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
        }

        return next.handle(request);
    }
}