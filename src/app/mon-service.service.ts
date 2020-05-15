import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonServiceService {

  private offset: number = 0;

  constructor() { }

  public setOffset(offset: number){ this.offset = offset; }

  public getOffset(): number{ return this.offset; }
}
