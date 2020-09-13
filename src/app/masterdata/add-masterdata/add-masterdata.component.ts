import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EndService } from 'src/app/helpers/endpoints.enum';

declare var $: any;
declare var DataTable: any;


@Component({
  selector: 'app-add-masterdata',
  templateUrl: './add-masterdata.component.html',
  styleUrls: ['./add-masterdata.component.css']
})
export class AddMasterdataComponent implements OnInit {
  typeName: string;
  selectedData: any;
  privileges;
  dataTableButtons: string;

  masterdataAddForm: FormGroup;
  masterdataEditForm: FormGroup;
  refDropdownValues = [];


  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const self = this;
    self.dataTableButtons = '';

    if (localStorage.getItem('loggedInUser')) {
      this.privileges = localStorage.getItem('privileges');
      //check privileges
      if (this.privileges.indexOf('WRITE_PRIVILEGE') != -1) {
        self.dataTableButtons = '<a class="btn btn-warning btn-circle"><i class="far fa-edit"></i></a>&nbsp;&nbsp;<button class="btn btn-danger btn-circle" type="button"><i class="fas fa-trash"></i></button>';
      }
    }

    //Subscribe params
    this.activatedRoute.params.subscribe(
      params => {
        const paramType = params['type'];
        this.typeName = paramType;
        let refUrl = EndService.MasterDataByType + paramType;
        $('#masterDataCategory').DataTable().destroy();
        $(document).ready(function () {
          var table = $('#masterDataCategory').DataTable({
            "ajax": refUrl,
            "info": false,
            "columns": [
              { "data": "refCode" },
              { "data": "refDescription" }
            ],
            "columnDefs": [
              {
                "targets": 2,
                "data": null,
                "defaultContent": self.dataTableButtons
              }],
            "lengthMenu": [[-1, 5, 10, 25, 50], ["All", 5, 10, 25, 50]]
          });
        });//End of datatable
      }
    );//End params


    //Delete Operation
    $('#masterDataCategory tbody').on('click', 'button', function () {
      var currentRow = $(this).closest("tr");
      self.selectedData = $('#masterDataCategory').DataTable().row(currentRow).data();
      $("#masterDeleteModal").modal('show');
    });

    this.masterdataAddForm = new FormGroup({
      refCode: new FormControl('', [Validators.required]),
      refType: new FormControl('', Validators.required),
      refDescription: new FormControl('', Validators.required),
      refName: new FormControl('', Validators.required),
      refStatus: new FormControl('1')
    });

    this.masterdataEditForm = new FormGroup({
      id: new FormControl(''),
      refCode: new FormControl('', [Validators.required]),
      refType: new FormControl(''),
      refDescription: new FormControl('', Validators.required),
      refName: new FormControl(''),
      refStatus: new FormControl('1')
    });

    //Edit Operation
    $('#masterDataCategory tbody').on('click', 'a', function () {
      var currentRow = $(this).closest("tr");
      self.selectedData = $('#masterDataCategory').DataTable().row(currentRow).data();
      self.masterdataEditForm.patchValue({
        id: self.selectedData['id'],
        refCode: self.selectedData['refCode'],
        refDescription: self.selectedData['refDescription'],
        refName: self.selectedData['refName'],
        refType: self.selectedData['refType'],
      });
      $("#masterEditModal").modal('show');
    });

  }

  submit() {
    this.masterdataAddForm.patchValue({
      refType: this.typeName,
      refName: this.typeName
    });

    var request = this.http.post(EndService.AddMasterData, JSON.stringify(this.masterdataAddForm.value));
    request.subscribe((res: string) => {
      $('#masterDataCategory').DataTable().ajax.reload();
    });
  }

  delete() {
    this.masterdataAddForm = new FormGroup({
      id: new FormControl(this.selectedData['id'], [Validators.required]),
      refStatus: new FormControl('0')
    });
    var request = this.http.post(EndService.AddMasterData, JSON.stringify(this.masterdataAddForm.value));
    request.subscribe((res: string) => {
      $('#masterDataCategory').DataTable().ajax.reload();
    });
  }

  edit() {
    var request = this.http.post(EndService.AddMasterData, JSON.stringify(this.masterdataEditForm.value));
    request.subscribe((res: string) => {
      $('#masterDataCategory').DataTable().ajax.reload();
    });
  }

  createData() {
    $("#masterAddModal").modal('show');
  }


}
