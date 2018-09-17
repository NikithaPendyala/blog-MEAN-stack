import { Component, OnInit, Input } from '@angular/core';
import {PostservService} from '../postserv.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() editid:string;
  eflag:boolean=false;
  update:any={};
  updata:any={};
  alertmsg:any={};

  constructor(private _postservService:PostservService,private _router : Router) { }

  ngOnInit() {
  }

  edit(){
    console.log(this.editid);
    this.eflag=!this.eflag;
    
  }
  updatefn(){
    this.updata={
      uid:this.editid,
      title:this.update.title,
      des:this.update.description
    }

    this._postservService.update(this.updata).subscribe((data)=>{
      this.alertmsg=data;
      this.eflag=!this.eflag;
      alert(this.alertmsg.msg);

    })

  }
  

}
