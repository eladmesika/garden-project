import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of}from 'rxjs/Observable/of';
import { Http } from '@angular/http';

@Injectable()
export class GardenDictonaryService {
    Http;
    modelItems = [];
   newItem='';

    static parameters = [Http];
    constructor(private http: Http) {
        this.Http = http;

    }
    getItem(model:string,id):Observable<any>
    {
        return  this.Http.get(`/api/dict/${model}/${id}`)
        .map(res=>res.json())
        .catch(err=>Observable.throw(err.json().error||'Server error'));
    }
   
    getItems(model:string):Observable<any[]>{
        return this.Http.get(`/api/dict/${model}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error || 'Server error'));
    }
    addItem(req):any{
    
        if(this.newItem)
        {
            return  this.Http.post(`/api/dict/${req.model}`,{ name:req.name ,info:req.info,img:req.img })
            .map(res=>res.json())
            .catch(err=>Observable.throw(err.json().error||'Server error'))
            .subscribe(item=>{
                console.log(`added item:${item}`);
            })
        }
    }
    editItem(req)
    {

    }
    deleteItem(modelName:string,id)
    {
            return  this.Http.delete(`/api/dict/${modelName}/${id}`).
            map(res=>res.json())
            .catch(err=>Observable.throw(err.json().error||'Server error'))
            .subscribe(()=>{
                console.log('item deleted');
            });
    }
}