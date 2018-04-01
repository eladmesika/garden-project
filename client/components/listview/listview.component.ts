import { Component, OnInit,Input } from '@angular/core';
import {GardenDictonaryService } from '../../services/gardenDictonary.service'
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TooltipModule } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {PlatformLocation } from '@angular/common';

@Component({
    selector: 'gr-listview',
    template: require('./listview.html'),
    styles: [require('./listview.scss')]
})
export class ListviewComponent implements OnInit {
    items:any[];
  modelname:string;
    constructor(private gardenDictonaryService: GardenDictonaryService
      ,private route:ActivatedRoute
      ,private platformLocation:PlatformLocation)
      {
    this.modelname=this.route.snapshot.paramMap.get('modelname');
    }
    
    ngOnInit(): void {
      this.getItems();
    }

   
    getItems(): void {

        this.gardenDictonaryService.getItems(this.modelname)
          .subscribe(items =>{ this.items = items.slice(0, 5);
            console.log(this.items[0]);
        });
      }

 
      onItemDelete(id):void{
          console.log(id);
        this.gardenDictonaryService.deleteItem(this.modelname,id);
        this.getItems();
      }
      onItemEdit(item):void{
        console.log(`on item edit param:${item._id}`);
      }
}