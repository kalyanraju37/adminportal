import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { EndService } from '../helpers/endpoints.enum';

declare var jwt_decode: any;

@Injectable()
export class AuthenticationService {
    
    
    constructor(private http: HttpClient,private router: Router,private zone: NgZone) { }

    login(username: string, password: string) {
       
        console.log('Authentication..');
        console.log(username);
        console.log(password);

        return this.http.post<any>(EndService.UserLogin, { userName: username, password: password })
        .pipe(map(user => {
            console.log('Login Successful'+user);
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('loggedInUser', user.userName);

                var decoded = jwt_decode(user.token);
                localStorage.setItem('claims',JSON.stringify(decoded));
                localStorage.setItem('privileges',JSON.stringify(decoded.scopes));
            }

            return user;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('claims');
        localStorage.removeItem('privileges');
    }
}