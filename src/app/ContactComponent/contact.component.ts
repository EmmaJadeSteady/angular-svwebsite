import { UserService } from './../admin/adminShared/user.service';
import{Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Brochure} from '../admin/adminShared/brochure';

@Component({
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})

export class ContactComponent{
   ContactComponent(){}

   email: string;
   username: string;
   address: string;
   
   constructor(private userSVC: UserService, private router: Router){}
 
   send(){
     
   }
 
 
   cancel(){
     this.router.navigate(['']);
   }
 
 
 
}