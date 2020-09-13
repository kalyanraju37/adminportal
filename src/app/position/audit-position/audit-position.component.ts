import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndService } from 'src/app/helpers/endpoints.enum';

declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-audit-position',
  templateUrl: './audit-position.component.html',
  styleUrls: ['./audit-position.component.css']
})
export class AuditPositionComponent implements OnInit {

  auditServiceUrl: string;
  positionId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const self = this;
    //Get the param
    this.positionId = this.router.url.split('/')[2];
    //Construct the Service URL
    if (this.positionId === undefined) {
      self.auditServiceUrl = EndService.GetAuditPositions;
    }
    else {
      self.auditServiceUrl = EndService.GetAuditPosition + this.positionId;
    }
    //$('#auditPositions').DataTable().destroy();
    $(document).ready(function () {
      $('#auditPositions').DataTable({
        "ajax": self.auditServiceUrl,
        "columns": [
          { "data": "positionId" },
          { "data": "version" },
          { "data": "associateId" },
          { "data": "associateName" },
          { "data": "email" },
          { "data": "positionType" },
          { "data": "team" },
          { "data": "indiaPoc" },
          { "data": "indiaLeader" },
          { "data": "usPoc" },
          { "data": "usLeader" },
          { "data": "billingCode" },
          { "data": "serviceType" },
          { "data": "technology" },
          { "data": "hiringStatus" },
          { "data": "department" },
          { "data": "createdBy" },
          { "data": "createdAt" }
        ],
        "lengthMenu": [[-1, 5, 10, 25, 50], ["All", 5, 10, 25, 50]],
        initComplete: function () {
          // Apply the search
          this.api().columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change clear', function () {
              if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
              }
            });
          });
        }
      });
    });

    $('#auditPositions tfoot th').each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="' + title + '" />');
    });
  }
}
