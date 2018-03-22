import { Component, OnInit } from '@angular/core';
import {GardenDictonaryService } from '../../services/gardenDictonary.service'
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'listview',
    template: require('./listview.html'),
    styles: [require('./listview.scss')]
})
export class ListviewComponent implements OnInit {
    items:any[];
  
    constructor(private gardenDictonaryService: GardenDictonaryService){
       
    }
    
    ngOnInit(): void {
       this.getItems();
    }

   
    getItems(): void {
        this.gardenDictonaryService.getItems('plants')
          .subscribe(items => this.items = items.slice(1, 5));
      }
     
}