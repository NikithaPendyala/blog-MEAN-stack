import { Component, OnInit } from '@angular/core';
import {PostservService} from '../postserv.service'


@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {

  postsdata:any=[];
  delid:any={};
  toast:any={};
  deldata:any={};

  constructor( private _postservService:PostservService) { }

  ngOnInit() {
    this._postservService.showdata().subscribe((data)=>{
      this.postsdata=data;
      });
 
  }

  delete(id:string){
    this.delid={did:id};
    this._postservService.delete(this.delid).subscribe((data)=>{
      this.deldata=data;
      alert(this.deldata.msg);
      this.ngOnInit();
    });  
  }

  



}
