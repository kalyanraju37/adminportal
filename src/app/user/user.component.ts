import { Component, OnInit } from '@angular/core';

declare var $:any;
declare var DataTable:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#viewUsers').DataTable( {
          "ajax": '/getUsers',
          "columns": [
            { "data": "userName" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "email" },
            { "data": "userRole" }
          ]
      } );
    } );
  }
}
