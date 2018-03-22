import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';


import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ListviewComponent } from './listview/listview.component';



@NgModule({
    imports: [
        CommonModule,
        CollapseModule,
        RouterModule,
       
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,
        ListviewComponent,

    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        ListviewComponent,
    ]
})
export class DirectivesModule {}
