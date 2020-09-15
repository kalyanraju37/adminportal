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
        "order": [],
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
          { "data": "fteHeadCount" },
          { "data": "remarks" },
          { "data": "createdBy" },
          { "data": "createdAt" }
        ],
        "lengthMenu": [[-1, 5, 10, 25, 50], ["All", 5, 10, 25, 50]],
        initComplete: function () {

          // hide empty columns
          this.hideEmptyColumns(this);
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

  /*
 * check all cells of given datatable and hide each column containing only empty cells
 * ATTENTION: this will only work if responsive-property in datatables is set to true
 */
 hideEmptyColumns(selector) {
  var emptyColumnsIndexes = []; // store index of empty columns here
  // check each column separately for empty cells
  $(selector).find('th').each(function(i) {
      // get all cells for current column
      var cells = $(this).parents('table').find('tr td:nth-child(' + (i + 1) + ')');
      var emptyCells = 0;

      cells.each(function(cell) {
          // increase emptyCells if current cell is empty, trim string to remove possible spaces in cell
          if ($(this).html().trim() === '') {
              emptyCells++;
          }
      });

      // if all cells are empty push current column to emptyColumns
      if (emptyCells === $(cells).length) {
          emptyColumnsIndexes.push($(this).index());
      }
  });

  // only make changes if there are columns to hide
  if (emptyColumnsIndexes.length > 0) {
      /* add class never to all empty columns
          never is a special class of the Responsive extension:
          Columns with class never will never be visible, regardless of the browser width, and the data will not be shown in a child row
      */
      $((selector).DataTable().columns(emptyColumnsIndexes).header()).addClass('never');
      // Recalculate the column breakpoints based on the class information of the column header cells, class never will now be available to Responsive extension
      $(selector).DataTable().columns.adjust().responsive.rebuild();
      // immediatly call recalc to have Responsive extension updae the display for the cahnge in classes
      $(selector).DataTable().columns.adjust().responsive.recalc();
  }
}
}
