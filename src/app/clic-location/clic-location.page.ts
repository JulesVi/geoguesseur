import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
    selector: 'app-clic-location',
    templateUrl: './clic-location.page.html',
    styleUrls: ['./clic-location.page.scss'],
})
export class ClicLocationPage implements OnInit {
    map: Map<any, any>;
    newMarker: any;

    constructor() { }

    ngOnInit() {
    }


    ionViewDidEnter() { this.leafletMap(); }

    leafletMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([45.19, 5.72], 10);
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'edupala.com © ionic LeafLet',
        }).addTo(this.map);


        marker([45.19, 5.72]).addTo(this.map)
            .bindPopup('Grenoble')
            .openPopup();
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

}
