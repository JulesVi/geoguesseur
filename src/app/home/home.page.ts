import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonServiceService } from '../mon-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, private monService: MonServiceService) {}

  navigate(continent: string): void{
    this.monService.setOffset(-1);
    this.router.navigate(['/image'], {queryParams: {continent: continent}});
  }

}
