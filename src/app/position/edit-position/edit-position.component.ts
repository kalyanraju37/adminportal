import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EndService } from 'src/app/helpers/endpoints.enum';

declare var $: any;

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {

  positionEditForm: FormGroup;
  positionId: string;

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
  workTypes = [];
  ftHeadCounts = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const self = this;

    //Get the param
    this.positionId = this.router.url.split('/')[2];

    this.positionEditForm = new FormGroup({
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
      serviceType: new FormControl('', Validators.required),
      technology: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      hiringStatus: new FormControl('', Validators.required),
      fteHeadCount: new FormControl('', Validators.required),
      remarks: new FormControl('')
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
      this.workTypes = refcode.data.WORK_TYPE;
      this.ftHeadCounts = refcode.data.FT_HEAD_COUNT;
    });


    var getPosition = this.http.get(EndService.GetPosition + this.positionId);
    getPosition.subscribe((position: any) => {
      self.positionEditForm.patchValue({
        positionId: position.data.positionId,
        associateId: position.data.associateId,
        associateName: position.data.associateName,
        email: position.data.email,
        positionType: position.data.positionType,
        team: position.data.team,
        indiaPoc: position.data.indiaPoc,
        indiaLeader: position.data.indiaLeader,
        usPoc: position.data.usPoc,
        usLeader: position.data.usLeader,
        billingCode: position.data.billingCode,
        serviceType: position.data.serviceType,
        technology: position.data.technology,
        department: position.data.department,
        hiringStatus: position.data.hiringStatus,
        fteHeadCount: position.data.fteHeadCount,
        remarks: position.data.remarks
      });

    });
  }
  submit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var request = this.http.post('/addPosition', JSON.stringify(this.positionEditForm.value), { headers: headers });
    request.subscribe((res: string) => {
      $("#positionModal").modal('show');
    });
  }

  success() {
    this.router.navigate(['position']);
  }
}
