import { Component, OnInit,Input, Output } from '@angular/core';
import {PostservService} from '../postserv.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addcomments',
  templateUrl: './addcomments.component.html',
  styleUrls: ['./addcomments.component.css']
})
export class AddcommentsComponent implements OnInit {
  @Input() postid:string;
  @Output() dataToparent: EventEmitter<any>= new EventEmitter();
  comments:string;
  commid:any={};
  add_commdata:any={};
  likeid:any={};
  eflag:boolean=false;

  
  
  noOfLikes:any=[];
  likedata:any=[];

  commdata:any=[];
  cflag:boolean=false;
  lflag:boolean=false;


  constructor(private _postservService:PostservService,private _http:HttpClient ) { }

  ngOnInit() {
  }

  viewcomments(){
      this.cflag=!this.cflag;
      if(this.cflag){
        this.commid={cid:this.postid }; 
        this._postservService.viewcomm(this.commid).subscribe((data:any)=>{
        this.commdata=data;
        });
      }
  }
  

  savecom(){
    this.add_commdata={
      pid:this.postid,
      comment:this.comments
    };
    this._postservService.savecomm(this.add_commdata).subscribe((data:any)=>{
      console.log(data);
      this.viewcomments();
    }); 
  }

  liked(){
    this.lflag=!this.lflag;
    this.likeid={lid:this.postid };
    this._postservService.likes(this.likeid).subscribe((data)=>{
      this.likedata=data;
      this.noOfLikes=this.likedata.likedby;
    });
  }

  edit(){
    this.eflag=!this.eflag;
  }
}
