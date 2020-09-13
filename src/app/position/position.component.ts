import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var DataTable: any;

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const self = this;
    $(document).ready(function () {

      $('#viewPositions').DataTable({
        "ajax": "/getAllPositions",
        "autoWidth": false,
        // scrollY: "400px",
        // scrollX: true,
        // scrollCollapse: true,
        // "fixedColumns": {
        //   leftColumns: 1
        // },
        "columns": [
          {
            "data": "positionId", fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html("&nbsp;&nbsp;<a href='audit-position/" + oData.positionId + "'><i class=\"fas fa-history\"></i></a>&nbsp;&nbsp;<a href='edit-position/" + oData.positionId + "'><i class=\"far fa-edit\"></i></a>&nbsp;&nbsp;"+oData.positionId );
            }
          },
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
          { "data": "department" }
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
        // ,
        // dom: 'frtip',
        // buttons: [
        //   'csv', 'excel', 'pdf', 'print',
        //   {
        //     extend: 'csv',
        //     text: 'Save current page',
        //     exportOptions: {
        //       modifier: {
        //         page: 'current'
        //       }
        //     }
        //   },
        //   {
        //     extend: 'excel',
        //     text: 'Save current page',
        //     exportOptions: {
        //       modifier: {
        //         page: 'current'
        //       }
        //     }
        //   },
        //   {
        //     extend: 'pdf',
        //     text: 'Save current page',
        //     exportOptions: {
        //       modifier: {
        //         page: 'current'
        //       }
        //     }
        //   },
        //   {
        //     extend: 'print',
        //     text: 'Save current page',
        //     exportOptions: {
        //       modifier: {
        //         page: 'current'
        //       }
        //     }
        //   }
        // ]
      });
    });

    $('#viewPositions tfoot th').each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="' + title + '" />');
    });


  }

}
