import { Component } from '@angular/core';
import {GardenDictonaryService} from '../services/gardenDictonary.service'
import { Http } from '@angular/http';
@Component({
    selector: 'app',
    template: `<navbar></navbar>
    <listview></listview>
    <router-outlet></router-outlet>
    <footer></footer>`
})
export class AppComponent {

}
