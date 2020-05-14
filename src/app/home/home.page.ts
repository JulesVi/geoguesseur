import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public route: ActivatedRoute, public router: Router) {}

  navigate(continent: string): void{
    this.router.navigate(['/image'], {queryParams: {continent: continent}});
  }

}
