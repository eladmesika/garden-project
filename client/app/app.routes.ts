import {NgModule} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListviewComponent } from '../components/listview/listview.component';
import { DetailViewComponent } from '../components/detailview/detailview.component';
import { MainComponent } from './main/main.component'

export const appRoutes: Routes = [{ path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{path:'home',component:MainComponent},
{path:'gardendictionary/:modelname',component:ListviewComponent},
{path:'gardendictionary/:modelname/detail/:_id',component:DetailViewComponent}
];
