import { Component } from '@angular/core';
import {Menu} from '../../app/menu/menu'

@Component({
    selector: 'navbar',
    template: require('./navbar.html'),
})
export class NavbarComponent {
    isCollapsed = true;
    menu = Menu
    Router;
}
