import { Brochure } from './../adminShared/brochure';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../adminShared/user.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {BrochureAdminService} from '../adminShared/brochure-admin.service';

import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';



@Component({
    templateUrl: './brochure-admin.component.html',
    styleUrls: ['./brochure-admin.component.css']
})

export class BrochureAdminComponent implements OnInit{
    theUser: string;
    menuChoice: string;
    brochures : Brochure[];
    formDisplay: boolean = true;
    singleBrochure: Brochure;

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getBrochures();
    }
    constructor(protected _sanitizer: DomSanitizer,
        private userSVC: UserService,
        private router: Router,
        private brochureAdminService: BrochureAdminService
    ){}
    getUrl(value :string ){
        return  this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }
    chooseMode(mode: string){
        this.menuChoice = mode;
    }
    getBrochures(){
        let dbRef = firebase.database().ref('brochures/');
        dbRef.once('value')
            .then((snapshot) =>{
                let tmp: string[] = snapshot.val();
                this.brochures = Object.keys(tmp).map(key => tmp[key])
                console.log("brochures found " + this.brochures);
                
            });
    }
    editBrochure(theBrochure: Brochure){
        this.singleBrochure = theBrochure;
        this.formDisplay = false;
    }
    cancelEdit(){
        this.formDisplay = true;
    }
    updateBrochure(single: Brochure){
        this.brochureAdminService.editBrochure(single);
        this.formDisplay = true;
    }
    deleteBrochure(single: Brochure){
        let verify = confirm('Are you sure you want to delete this brochure?');
        if(verify == true){
            this.brochureAdminService.removeBrochure(single);
            this.router.navigate(['/admin/']);
        }else{
            alert("Brochure has not been deleted");
        }
    }
}