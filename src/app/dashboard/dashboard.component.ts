import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndService } from '../helpers/endpoints.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  openPositions: string;
  onHoldPositions: string;
  inprogressPositions: string;
  offeredPositions: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    var getDashBoard = this.http.get(EndService.Dashboard);
    getDashBoard.subscribe((refcode: any) => {
      this.openPositions = refcode.data.openPositions;
      this.onHoldPositions = refcode.data.onHoldPositions;
      this.inprogressPositions = refcode.data.inProgressPositions;
      this.offeredPositions = refcode.data.offeredPositions;
    });
  }
  
 
}
