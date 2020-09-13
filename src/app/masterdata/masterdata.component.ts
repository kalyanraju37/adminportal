import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndService } from '../helpers/endpoints.enum';

declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-masterdata',
  templateUrl: './masterdata.component.html',
  styleUrls: ['./masterdata.component.css']
})
export class MasterdataComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    const self = this;
    $(document).ready(function () {
      $('#viewMasterData').DataTable({
        "ajax": EndService.RefCodes,
        "columns": [
          { "data": "refName" },
          { "data": "refCode" },
          { "data": "refDescription" }
        ]
      });
    });
  }
}
