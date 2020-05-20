import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnService } from '../turn.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  private sommeKM: number = 0;
  private record: number = 0;

  constructor(public router: Router, private turnService: TurnService, private storage: Storage) { }

  ngOnInit() {
    this.sommeKM = this.turnService.getDistance();
    this.turnService.resetTurn();

    this.storage.get('sommeKM').then((val) => {
      if(this.sommeKM !== 0 && this.sommeKM < val || this.sommeKM !== 0 && val === null){
        this.storage.set('sommeKM', this.sommeKM);
        this.record = this.sommeKM;
      }else{
        this.record = val;
      }
    });
  }

  navigate(continent: string): void{
    this.turnService.resetDistance();
    this.router.navigate(['/home']);
  }
}
