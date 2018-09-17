import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerform:any={};

  constructor(private _http:HttpClient, private _router:Router) { }

  ngOnInit() {
  }
  register(){
    this._http.post('http://localhost:3000/save',this.registerform).subscribe((data)=>{
      // console.log(data);
    }); 
    this._router.navigate(['/login']);  
  }
}
