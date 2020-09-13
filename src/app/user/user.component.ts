import { Component, OnInit } from '@angular/core';
import { EndService } from '../helpers/endpoints.enum';

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
          "ajax": EndService.GetUsers,
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
