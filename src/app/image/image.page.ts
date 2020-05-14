import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  private url: string = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&rows=1&start=';
  private endUrl: string = '&facet=category&facet=region&facet=states&refine.region=Europe+and+North+America';

  site: string;
  id_number: string;
  coordinates: string[];

  continent: string;

  constructor(private readonly http: HttpClient, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data =>{
      this.continent = data.continent;
    });

    this.getImagesURLS();
    this.getRandomLocation().subscribe(data=>{
      // console.log(data.records);
      this.site = data.records[0].fields.site
      this.id_number = data.records[0].fields.id_number
      this.coordinates = data.records[0].fields.coordinates
    });
  }

  getRandomLocation() : Observable<any> {
    var id = Math.floor(Math.random() * Math.floor(531));
    return this.http.get(`${this.url}${id}${this.endUrl}`);
  }

  getImagesURLS() : any {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>{
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        // this.callback(xmlHttp.responseText);
        console.log(xmlHttp.responseText);
    }
    xmlHttp.open("GET", "https://whc.unesco.org/en/list/1478/gallery/&maxrows=20", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlHttp.send(null);
  }

  // callback(data: any): void {
  //   var el = document.createElement( 'html' );
  //   el.innerHTML = data;
  //   let imgs = el.getElementsByClassName('icaption-img');
  //   for (let k = 0; k < imgs.length; k++) {
  //       console.log(imgs[k].getAttribute('data-src'));
  //   }
  // }

}
