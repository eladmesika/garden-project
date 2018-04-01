import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector: 'app',
    template: `<navbar></navbar>
    <router-outlet></router-outlet>
    <footer></footer>`
})
export class AppComponent {

}
