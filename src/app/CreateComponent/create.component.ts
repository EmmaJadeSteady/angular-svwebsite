import { Order } from './../admin/adminShared/entities/order';
import { MatchSummary } from './../admin/adminShared/entities/matchSummary';
import { PlayerProfile } from './../admin/adminShared/entities/playerProfile';
import { UserService } from './../admin/adminShared/user.service';
import{Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Pages} from '../admin/adminShared/entities/pages';
import {Reports} from '../admin/adminShared/entities/reports';
import {Price} from '../admin/adminShared/entities/price';
import {BrochureSeedService} from '../admin/adminShared/brochure-seed.service';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {OrderAdminService} from '../shared/services/orderAdminSVC'


@Component({
    selector:'order-menu',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
    
        //get reports, price and pages on init and seeds data if needed
    
    theUser: string;
    //: string;
    allPages : Pages[];
    allPrices: Price[];
    allReports: Reports[];
   // formDisplay: boolean = true;
   
    items: Array<any> = [];
    bundlePages: string[];
    bundleCopies: string[];
    selectedPageBundle: any;
    selectedCopiesBundle: any;
    selectedPrice: any;
    reportDescription: string;
    defaultPrice: any;
    leagueFlag: boolean;
    battingElCriteria: string;
    bowlingElCriteria: string;
    battingElOptions: string[];
    selectedBattingElOptions: string;
    bowlingElOptions: string[];
    selectedBowlingElOptions : string;
    extraPagesTypes: string[];
    extraPages: Array<any> = [];
    selectedExtraPage: string;
    playerProfile: PlayerProfile;
    matchSummary : MatchSummary;
    extraPageDetail: any;
    addedPages = 13;
    playersName: string;
    profileSelected: string;
    comment: string;
    oppositionName:string;
    fixtureDate: Date;
    typePlayerProfile: boolean;
    profiles =["Batter", "Bowler", "All-Rounder"];
    order: Order;
    username: string;
    email: string;
    clubName: string;
    teamName: string;
    logoSource: File;
    sponsorSource: File;
    statisticsSource: File;
    resultsSource: File;
    friendlyFlag: boolean;
    cupFlag: boolean;
    orderAdminSVC: OrderAdminService;
 

    ngOnInit(){
        //this.theUser = this.userSVC.loggedInUser;
        this.getPages();
        this.getReports();
        this.getPrices(); 
        this.bundlePages = ["12","16","20","24"];
        this.bundleCopies = ["15","20","25", "30", "40", "50"];
        this.selectedPageBundle = this.bundlePages[0];
        this.selectedCopiesBundle = this.bundleCopies[0];
        this.battingElOptions = ["Runs","Innings","Games"];
        this.bowlingElOptions = ["Wickets", "Overs", "Games"];
        this.extraPagesTypes =["Player Profile", "Match Summary"];
      
    }
    constructor(protected _sanitizer: DomSanitizer,
        //private userSVC: UserService,
        private router: Router,
        private brochureSeedService: BrochureSeedService
    ){
       
        if(!firebase.apps.length ){
            firebase.initializeApp({    
                apiKey: "AIzaSyClipfqomRCJJ25TCRZc23-bbdb7kYpqVc",
                authDomain: "sportingvisuals-c8349.firebaseapp.com",
                databaseURL: "https://sportingvisuals-c8349.firebaseio.com",
                projectId: "sportingvisuals-c8349",
                storageBucket: "sportingvisuals-c8349.appspot.com",
                messagingSenderId: "259299744946"
            })
        }

        
      
        
         
    }
    isPlayerProfile(obj: any){
        if( obj == PlayerProfile)
            return true;
        return false;
    }
    extraPageSelected(){
        console.log("extra page selected ");

        if(this.selectedExtraPage == "Player Profile"){
            console.log("extra page player profile");
            this.extraPageDetail =  PlayerProfile;
            this.typePlayerProfile = true;
        }else{
            console.log("extra page match summary");
            this.extraPageDetail = MatchSummary;
            this.typePlayerProfile = false;
        }
    }
    addExtraPage(){
        console.log("add extra page ");
        if(this.extraPageDetail === PlayerProfile){
                       this.playerProfile = this.extraPageDetail;
            this.playerProfile.playerName = this.playersName;
            this.playerProfile.profilesType = this.profileSelected;
            this.playerProfile.comment = this.comment;
            console.log("extra page adding: player profile " + this.playersName + "," + this.profileSelected + this.comment);
            
            this.extraPages.push(this.playerProfile);
        }else{
            console.log("extra page adding match summary");
            this.matchSummary = this.extraPageDetail;
            this.matchSummary.fixtureDate = this.fixtureDate;
            this.matchSummary.opposition = this.oppositionName;
            this.matchSummary.comment = this.comment;
            this.extraPages.push(this.matchSummary);
        }
        for(let j in this.extraPages){
            console.log(this.extraPages[j].playerName);
        }
        
        this.addedPages++;
        //reset form
        this.extraPageDetail = null;
        this.selectedExtraPage = null;
        this.comment = null;
        this.playersName = null;
        this.profileSelected = null;
        this.fixtureDate = null;
        this.oppositionName = null;
   
    }
    bundleChange(){
        for(let i in this.allPrices){
            let price = this.allPrices[i];
            if(price.noOfPages == this.selectedPageBundle){
                if(price.noOfCopies == this.selectedCopiesBundle){
                    this.selectedPrice = price.price;
                }
            }            
        }
        for(let i in this.allReports){
            let report = this.allReports[i];
            if(report.noOfPages == this.selectedPageBundle){
                this.reportDescription = report.description;
                
            }            
        }
    }
    getUrl(value :string ){
        return  this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
   
    getPages(){
        let dbRef = firebase.database().ref('pages/');  
        
       // this.brochureSeedService.seedAll();
       
        dbRef.once('value')
            .then((snapshot) =>{
                let tmp: string[] = snapshot.val();
                this.allPages = Object.keys(tmp).map(key => tmp[key])
                console.log("pages loaded " );
                
            });
       

    }
   
    getPrices(){
        let dbRef = firebase.database().ref('pricing/');
        dbRef.once('value')
            .then((snapshot) =>{
                let tmp: string[] = snapshot.val();
                this.allPrices = Object.keys(tmp).map(key => tmp[key])
                console.log("prices loaded ");
                this.loadImages();
               
                this.defaultPrice = this.allPrices[0];
               
                this.selectedPrice = this.allPrices[0].price;
                this.reportDescription = this.allReports[0].description;
                
            });   
           
       
    }
    loadImages(){
        console.log("loading images " + this.allPages.length);
        for(let i in this.allPages){
            let page = this.allPages[i];
            this.items[i] = { name: page.img  };
            console.log("current page loaded is "+ page.img);
        }
    }

    getReports(){
        let dbRef = firebase.database().ref('reports/');
        dbRef.once('value')
            .then((snapshot) =>{
                let tmp: string[] = snapshot.val();
                this.allReports = Object.keys(tmp).map(key => tmp[key])
                console.log("reports loaded ");
                
            });   
       
    }
    orderBrochure(){
        console.log("creating order ... ");
        let battingAverages = [this.battingElCriteria, this.selectedBattingElOptions];
        let bowlingAverages = [this.bowlingElCriteria, this.selectedBowlingElOptions];
      

        this.order = new Order(
         this.username,
         this.email,
         this.selectedPageBundle,
         this.selectedCopiesBundle,
         this.selectedPrice,
         this.clubName,
         this.teamName,
         this.logoSource,
         this.sponsorSource,
         this.statisticsSource,
         this.resultsSource,
         battingAverages,
         bowlingAverages,
         this.extraPages,
         null           
        );
        //note will need to create user if they do not exist so that they can view their brochure...?
        console.log("pushing order");
        this.orderAdminSVC.pushOrder(this.order);
        alert('${this.title} added to orders');
        this.router.navigate(['']);
    }
    cancel(){
        this.router.navigate(['']);
    }

    
}


