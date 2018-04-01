import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';


import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ListviewComponent } from './listview/listview.component';
import { TooltipModule } from 'ngx-bootstrap';
import {DetailViewComponent} from './detailview/detailview.component';


@NgModule({
    imports: [
        CommonModule,
        CollapseModule,
        RouterModule,
        TooltipModule.forRoot(),
        
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        ListviewComponent,
        DetailViewComponent

    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        ListviewComponent,
        DetailViewComponent
    ]
})
export class DirectivesModule {}
