import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
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

    constructor(public route: ActivatedRoute, public alertController: AlertController) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.coordinates = params.coordinates;
            this.site = params.site;
        });
    }


    ionViewDidEnter() {
        this.leafletMap();
        this.map.addEventListener('click', async (e: any) => {
            const alert = await this.alertController.create({
                header: 'Attention !',
                message: '<strong>Etes vous sur de valider ce choix ?</strong>',
                buttons: [
                    {
                        text: 'NON',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Go !',
                        handler: () => {
                            marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(this.map);
                            marker(this.coordinates, { draggable: true }).addTo(this.map);
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
        this.map = new Map('mapId').setView([45.19, 5.72], 5);
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
