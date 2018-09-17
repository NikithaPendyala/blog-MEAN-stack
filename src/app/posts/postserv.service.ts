import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostservService {
  $datafromserver= new Subject<any>();
  $specificpost= new Subject<any>();

  postservdata:any=[];

  constructor(private _http:HttpClient) { }

  showdata(){
    return this._http.get('http://localhost:3000/lpost');
  }

  viewspecific(id:any){
    this._http.post('http://localhost:3000/specific', id).subscribe((data:any)=>{
      this.$specificpost.next(data);
    });
  }

  viewcomm(cid:any){
     return this._http.post('http://localhost:3000/vcomm', cid);
    }

  savecomm(commdata:any){
    return this._http.post('http://localhost:3000/savecomm', commdata);
  }

  likes(lid:any){
    return this._http.post('http://localhost:3000/likeno', lid);
  }

  delete(did:any){
    return this._http.post('http://localhost:3000/del', did);
  }

  update(udata:any){
    return this._http.post('http://localhost:3000/update', udata);
  }
}
