import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {GardenDictonaryService} from '../../services/gardenDictonary.service'

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap';

import { MainComponent } from './main.component';
import {appRoutes} from '../app.routes'
import { DirectivesModule } from '../../components/directives.module'





@NgModule({
    providers:[GardenDictonaryService],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        DirectivesModule,

        TooltipModule.forRoot(),
    ],
    declarations: [
        MainComponent,
    ],

    exports: [
        MainComponent,
    ],
})
export class MainModule {}
