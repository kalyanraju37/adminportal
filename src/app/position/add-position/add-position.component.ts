import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndService } from 'src/app/helpers/endpoints.enum';


declare var $: any;

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  positionAddForm: FormGroup;

  billingCodes = [];
  indiaLeaders = [];
  hiringStatus = [];
  indiaPocs = [];
  teams = [];
  departments = [];
  usPocs = [];
  technologies = [];
  positionTypes = [];
  usLeaders = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.positionAddForm = new FormGroup({
      positionId: new FormControl('', [Validators.required]),
      associateId: new FormControl('', [Validators.required]),
      associateName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      positionType: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      indiaPoc: new FormControl('', Validators.required),
      indiaLeader: new FormControl('', Validators.required),
      usPoc: new FormControl('', Validators.required),
      usLeader: new FormControl('', Validators.required),
      billingCode: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      technology: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      hiringStatus: new FormControl('', Validators.required),
    });

    var getRefcode = this.http.get(EndService.GetRefCodes);
    getRefcode.subscribe((refcode: any) => {
      this.billingCodes = refcode.data.BILLING_CODE;
      this.indiaLeaders = refcode.data.INDIA_LEADER;
      this.hiringStatus = refcode.data.HIRING_STATUS;
      this.indiaPocs = refcode.data.INDIA_POC;
      this.teams = refcode.data.TEAM;
      this.departments = refcode.data.DEPARTMENT;
      this.usPocs = refcode.data.US_POC;
      this.technologies = refcode.data.TECHNOLOGY;
      this.positionTypes = refcode.data.POSITION_TYPE;
      this.usLeaders = refcode.data.US_LEADER;
    });
  }

  submit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var request = this.http.post(EndService.AddPosition, JSON.stringify(this.positionAddForm.value), { headers: headers });
    request.subscribe((res: string) => {
      $("#positionModal").modal('show');
    });
  }

  success() {
    this.router.navigate(['position']);
  }


}
