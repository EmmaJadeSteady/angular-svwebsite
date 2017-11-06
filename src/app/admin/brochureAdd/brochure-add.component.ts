import {Component } from '@angular/core';
import {Router} from '@angular/router';
import {BrochureAdminService} from '../adminShared/brochure-admin.service';
import {Brochure} from '../adminShared/brochure';

@Component({
    selector: 'add-menu',
    templateUrl: './brochure-add.component.html'
})

export class BrochureAddComponent{
    brochureTitle: string;
    sport: string;
    brochureSource: string;
    file: File;    
    brochure : Brochure;
    username: string = null;

    constructor(private brochureAdminSVC: BrochureAdminService, private router: Router){}

    fileLoad($event: any){
        let myReader:FileReader = new FileReader();
        this.file = $event.target.files[0];
        this.brochureTitle = this.file.name;
        myReader.readAsDataURL(this.file);

        myReader.onload = (e: any) =>{
            this.brochureSource = e.target.result;
        }
    }

    createBrochure(){
        console.log("creating post ... " + this.brochureTitle + " sport " + this.sport + " file "  + this.file.name);
        this.brochure = new Brochure(
            this.brochureTitle,
            this.brochureTitle,
            this.sport,
            this.file,
            null,
            this.username,
            this.brochureSource.substring(23),
         
           
        );
        //note will need to create user if they do not exist so that they can view their brochure...?
        console.log("pushing brochure");
        this.brochureAdminSVC.pushBrochure(this.brochure);
        alert('${this.title} added to brochures');
        this.router.navigate(['/admin']);
    }
    cancel(){
        this.router.navigate(['/admin']);
    }
}