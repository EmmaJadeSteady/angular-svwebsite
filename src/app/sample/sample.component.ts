import { UserService } from './../admin/adminShared/user.service';
import{Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Brochure} from '../admin/adminShared/brochure';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.css']
})

export class SampleComponent implements OnInit{
    brochures: Brochure[];

    constructor(private userSVC: UserService, private router: Router, protected _sanitizer: DomSanitizer,){

    }
    ngOnInit(){
        this.getBrochures();
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
    contact(){
        this.router.navigate(['/contact']);
    }
    createBrochure(){
        this.router.navigate(['/createBrochure']);
    }
    getUrl(value :string ){
        return  this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}