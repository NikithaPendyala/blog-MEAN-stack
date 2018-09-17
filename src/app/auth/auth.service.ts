import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient, private _cookieService:CookieService, private _router:Router) { }

  $authObservable : BehaviorSubject<any> = new BehaviorSubject(this.checkUserStatus());

  login(auth_details:any){
    this._http.post('http://localhost:3000/authenticate', auth_details).subscribe((data:any)=>{
      if(data.isLoggedIn){
        this._cookieService.set('token',data.token);
        this.$authObservable.next(data.token);
        this._router.navigate(['/home']);
      }
      else{
        alert('Invalid Credentials');
      }
    }); 
  }

  checkUserStatus(){
    return this._cookieService.get('token');
  }
  logout(){
    this._cookieService.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }
}
