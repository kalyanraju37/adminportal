import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndService } from '../helpers/endpoints.enum';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loggedInUserName;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('loggedInUser')) {
      this.loggedInUserName = localStorage.getItem('loggedInUser');
    }

    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userName: new FormControl(this.loggedInUserName)
    });
  }

  submit() {
      var request = this.http.post(EndService.ResetPassword, JSON.stringify(this.resetPasswordForm.value));
      request.subscribe((res: string) => {
        this.router.navigate(['dashboard']);
      });
  }

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

}
