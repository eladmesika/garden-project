import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of}from 'rxjs/Observable/of';
import { Http } from '@angular/http';

@Injectable()
export class GardenDictonaryService {
    Http;

    modelItems = [];
   

    static parameters = [Http];
    constructor(private http: Http) {
        this.Http = http;

    }
   
    getItems(model:string):Observable<any[]>{
        return this.Http.get(`/api/dict/${model}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error || 'Server error'));
    }
}