import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostservService} from '../postserv.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  pid:any='';
  specificpost:any='';

  constructor(private _activatedRoute:ActivatedRoute, private _postservService:PostservService, private _router:Router ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
      this.pid=data;
      
    });
      this._postservService.viewspecific(this.pid);
      this._postservService.$specificpost.subscribe((data)=>{
        this.specificpost=data;
    });
  }

  back(){
    this._router.navigate(['/listpost']);

  }
}
