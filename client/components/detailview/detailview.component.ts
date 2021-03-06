import { Component, OnInit, Input } from '@angular/core';
import { GardenDictonaryService } from '../../services/gardenDictonary.service'
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TooltipModule } from 'ngx-bootstrap';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component(
    {
        selector: 'gr-detailview',
        template: require('./detailview.html'),
        styles: [require('./detailview.scss')]
    })
export class DetailViewComponent implements OnInit {
    @Input() item: any;
    @Input('modelName') modelName: string;

    constructor(
        private gardenDictonaryService: GardenDictonaryService,
        private location: Location,
        private route: ActivatedRoute
    ) {
        this.modelName = this.route.snapshot.paramMap.get('modelname');
    }

    ngOnInit() {

        this.getItem();
    }

    getItem() :void{
        const id = this.route.snapshot.paramMap.get('_id');
         this.gardenDictonaryService.getItem(this.modelName, id).subscribe(serveritem=>this.item=serveritem);
    }
    back(): void {
        this.location.back();
    }
    save(): void {
        this.gardenDictonaryService.editItem(this.item,this.modelName);
    }

}
