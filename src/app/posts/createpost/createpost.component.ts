import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostservService} from '../postserv.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  createdetails:any={};

  constructor(private _http:HttpClient, private _postservService:PostservService,private _router:Router) { }

  ngOnInit() {
  }

  post(){
    this._http.post('http://localhost:3000/cpost',this.createdetails).subscribe((data)=>{
      console.log(data);
  });
  this._router.navigate(['/listpost']);

  }
}
