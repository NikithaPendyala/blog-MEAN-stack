import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  toggleLinks:boolean=false;

  constructor(private _authSerice:AuthService) { }

  ngOnInit() {
    this._authSerice.$authObservable.subscribe((data)=>{
      this.toggleLinks=data;
    })
  }
  logout(){
    this._authSerice.logout();

  }

}
