import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonServiceService } from '../mon-service.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  private maxOffset: number = 0;
  private startUrl: string = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&rows=1&start=';
  private endUrl: string = '&facet=category&facet=region&facet=states&refine.region=';

  private site: string;
  private id_number: string;
  private coordinates: string[];
  private imageUrlTab: string[] = [];

  constructor(private readonly http: HttpClient, public route: ActivatedRoute, public router: Router, private monService: MonServiceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      console.log(this.monService.getOffset());
      switch(params.continent) { 
        case 'Europe+and+North+America': { 
          this.maxOffset = 531;
          break; 
        }
        case 'Asia+and+the+Pacific': { 
          this.maxOffset = 266;
          break; 
        }
        case 'Latin+America+and+the+Caribbean': { 
          this.maxOffset = 142;
          break; 
        }
        case 'Africa': { 
          this.maxOffset = 96;
          break; 
        }
        case 'Arab+States': { 
          this.maxOffset = 86;
          break; 
        }
        default: { 
          this.router.navigate(['/home']);
          break; 
        } 
      }

      this.endUrl += params.continent;
      
      this.getRandomLocation().subscribe(data=>{
        if(data.records[0]){
          this.site = data.records[0].fields.site
          this.id_number = data.records[0].fields.id_number
          this.coordinates = data.records[0].fields.coordinates

          this.getImagesURLS();
        }
      });
    });
  }

  getRandomLocation() : Observable<any> {
    if(this.monService.getOffset() === -1){
      this.monService.setOffset(Math.floor(Math.random() * Math.floor(this.maxOffset)));
      console.log(this.monService.getOffset());
    }
    this.startUrl += this.monService.getOffset();
    return this.http.get(`${this.startUrl}${this.endUrl}`);
  }

  getImagesURLS() : any {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>{
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        this.callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", `https://whc.unesco.org/en/list/${this.id_number}/gallery/&maxrows=20`, true); // true for asynchronous
    xmlHttp.send();
  }

  callback(data: any): void {
    var el = document.createElement( 'html' );
    el.innerHTML = data;
    let imgs = el.getElementsByClassName('icaption-img');
    for (let k = 0; k < imgs.length; k++) {
        // console.log(imgs[k].getAttribute('data-src'));
        this.imageUrlTab.push("https://whc.unesco.org"+imgs[k].getAttribute('data-src'));
    }
  }

  navigate(): void{
    this.router.navigate(['/clic-location'], {queryParams: {coordinates: this.coordinates, site: this.site}});
  }

}
