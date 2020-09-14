import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndService } from 'src/app/helpers/endpoints.enum';

declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userAddForm: FormGroup;
  roles = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userAddForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userRole: new FormControl('')
    });

    var getRefcode = this.http.get(EndService.GetUserRoles);
    getRefcode.subscribe((refcode: any) => {
      this.roles = refcode.data;
    });
  }

  submit() {
    var request = this.http.post(EndService.GetUserSignup, JSON.stringify(this.userAddForm.value));
    request.subscribe((res: string) => {
      $("#userModal").modal('show');
    });
  }

  success()
  {
    this.router.navigate(['app-user']);
  }

  get userName() { return this.userAddForm.get('userName'); }
  get password() { return this.userAddForm.get('password'); }
  get email() { return this.userAddForm.get('email'); }

}
