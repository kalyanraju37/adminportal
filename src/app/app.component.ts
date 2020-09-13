import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized, ActivatedRoute } from '@angular/router';

export enum Layouts {
  MainLayout,
  Login
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'br-hiring-tracker';
  Layouts = Layouts;
  layout = '';

  constructor(private router: Router) {
    
  }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.layout = data.state.root.firstChild.data.layout;
      }
    });
  }

}
