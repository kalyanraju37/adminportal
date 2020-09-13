import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
      password: new FormControl('', [Validators.required]),
      userName: new FormControl(this.loggedInUserName, Validators.required)
    });
  }

  submit() {
    var request = this.http.post('/resetPassword', JSON.stringify(this.resetPasswordForm.value));
    request.subscribe((res: string) => {
      this.router.navigate(['dashboard']);
    });

  }

}
