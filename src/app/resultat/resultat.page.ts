import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  private sommeKM: number = 0;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  navigate(continent: string): void{
    this.router.navigate(['/home']);
  }
}
