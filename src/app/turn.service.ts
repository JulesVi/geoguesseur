import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  private turn: number = 1;
  private totalDistance: number = 0;

  constructor() { }

  public incrementTurn(): void{ this.turn++ }

  public getTurn(): number{ return this.turn }

  public incrementDistance(distance: number): void { this.totalDistance += distance}

  public getDistance(): number { return this.totalDistance}
}
