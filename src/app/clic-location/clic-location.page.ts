import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, LeafIcon } from 'leaflet';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-clic-location',
    templateUrl: './clic-location.page.html',
    styleUrls: ['./clic-location.page.scss'],
})
export class ClicLocationPage implements OnInit {
    map: Map;
    newMarker: any;
    coordinates: number[];
    site: string;
    region: any[] = [45.19, 5.72]; // par défaut centré sur la france
    continent: string;
    resultat: number;

    markerHtmlStyles = `
        background-color: green;
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`;
    icon = L.divIcon({
        className: "customMarker",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${this.markerHtmlStyles}" />`
    })

    constructor(public route: ActivatedRoute, public alertController: AlertController, public router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.coordinates = params.coordinates;
            this.site = params.site;
            this.continent = params.continent;
            switch (this.continent) {
                case 'Europe+and+North+America': {
                    this.region = [44.501970, -40.591940];
                    break;
                }
                case 'Asia+and+the+Pacific': {
                    this.region = [30.927053, 117.700535];
                    break;
                }
                case 'Latin+America+and+the+Caribbean': {
                    this.region = [-0.916626, -60.355207];
                    break;
                }
                case 'Africa': {
                    this.region = [4.870987, 18.785872];
                    break;
                }
                case 'Arab+States': {
                    this.region = [35.772484, 42.203042];
                    break;
                }
                default: {
                    this.router.navigate(['/home']);
                    break;
                }
            }
        });
    }


    ionViewDidEnter() {
        this.leafletMap();
        this.map.addEventListener('click', async (e: any) => {
            let lat = e.latlng.lat; // lattitude
            let lng = e.latlng.lng; // longitude

            let newMarker = marker([lat, lng], { draggable: false }).addTo(this.map);

            const alert = await this.alertController.create({
                header: 'Attention !',
                message: '<strong>Etes vous sur de valider ce choix ?</strong>',
                buttons: [
                    {
                        text: 'NON',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (res) => {
                            this.map.removeLayer(newMarker);
                            console.log('annulé');
                        }
                    }, {
                        text: 'Go !',
                        handler: () => {           
                            marker([lat, lng], { draggable: false }).addTo(this.map);
                            marker(this.coordinates, { icon: this.icon }, { draggable: false }).addTo(this.map);
                            L.polyline([[lat, lng], this.coordinates],
                                {
                                    weight: 10,
                                    opacity: .7,
                                    dashArray: '20,15',
                                    lineJoin: 'round'
                                }).addTo(this.map);
                                this.resultat = Number(L.latLng(this.coordinates).distanceTo(L.latLng(lat,lng)))/1000;
                                
                            this.map.removeEventListener('click');
                        }
                    }
                ]
            });
            await alert.present();
        });
    }

    leafletMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView(this.region, 4);
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'edupala.com © ionic LeafLet',
        }).addTo(this.map);


        // marker([45.19, 5.72]).addTo(this.map);
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

}
