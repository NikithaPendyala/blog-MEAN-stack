import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:any={};

  constructor(private _authSerice:AuthService) { }

  ngOnInit() {
  }

  login(){
    this._authSerice.login(this.loginform);
  }

}
