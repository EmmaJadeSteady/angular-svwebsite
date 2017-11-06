import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Brochure } from '../adminShared/brochure';
import {Reports} from '../adminShared/entities/reports';
import {Price} from '../adminShared/entities/price';
import {Pages} from '../adminShared/entities/pages';

@Injectable() /*
PRICING

pages	copies	price
12    	15	59.50
16	
20
24

PAGES TABLE
Page no, Page Name, Image
1 Front Cover, 
2Season Overview, 
3Team Batting, 
4Team Bowling, 
5Fielding, 
6Batsmen, 
7Bowlers, 
8Batting Statistics, 
9Bowling Statistics, 
10Innings, 
11Spells, 
12Back Cover

13“Appearances” 
14 match summary page
15 player-profile pages

Report Type
pages, report desc
12       includes Front Cover, Season Overview, Team Batting, Team Bowling, Fielding,            Batsmen, Bowlers, Batting Statistics, Bowling Statistics, Innings, Spells, Back Cover
16       adds “Appearances” page plus 3 match summary or player-profile pages
20      adds “Appearances” page plus 7 match summary or player-profile pages
24      adds “Appearances” page plus 11 match summary or player-profile pages

*/
export class BrochureSeedService {
   
    seedAll(){
        this.seedPages();
        this.seedReports();
        this.seedPrice();
    }

  /*  getBlob(page: string){
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", "../images/ " + page + ".png"); 
        xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
        xhr.onload = function() 
        {
            document.getElementsByTagName("body")[0].innerHTML = xhr.response;//xhr.response is now a blob object
        }
        xhr.send(); 
    }*/

    seedReports(){
        console.log("seeding reports");
        try{
            let dbRef = firebase.database().ref('reports/');
            let newReport = dbRef.push();
            newReport.set ({
                 noOfPages: 12,
                 description: "Includes Front Cover, Season Overview, Team Batting, Team Bowling, Fielding, Batsmen, Bowlers, Batting Statistics, Bowling Statistics, Innings, Spells, Back Cover",
                id: newReport.key
            }); 
             newReport = dbRef.push();
            newReport.set ({
                 noOfPages: 16,
                 description: "adds 'Appearances' page plus 3 match summary or player-profile pages",
                id: newReport.key
            }); 
             newReport = dbRef.push();
            newReport.set ({
                 noOfPages: 20,
                 description: "adds 'Appearances' page plus 7 match summary or player-profile pages",
                id: newReport.key
            }); 
            newReport = dbRef.push();
            newReport.set ({
                 noOfPages: 24,
                 description: "adds 'Appearances' page plus 11 match summary or player-profile pages",
                id: newReport.key
            });       
           
        }catch (error){
            alert(`failed upload: ${error}`);
        };         

    }
    seedPrice(){
        try{
            console.log("seeding price");
            let dbRef = firebase.database().ref('pricing/');
            let newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 12, noOfCopies: 15, price: 59.50,id: newPrice.key }); 
            newPrice = dbRef.push();           
            newPrice.set ({ noOfPages: 12, noOfCopies: 20, price: 71.00,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 12, noOfCopies: 25, price: 82.50,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 12, noOfCopies: 30, price: 94.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 12, noOfCopies: 40, price: 117.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 12, noOfCopies: 50, price: 140.00,id: newPrice.key }); 
           
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 16, noOfCopies: 15, price: 74.50,id: newPrice.key }); 
            newPrice = dbRef.push();           
            newPrice.set ({ noOfPages: 16, noOfCopies: 20, price: 87.00,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 16, noOfCopies: 25, price: 99.50,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 16, noOfCopies: 30, price: 112.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 16, noOfCopies: 40, price: 137.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 16, noOfCopies: 50, price: 162.00,id: newPrice.key }); 
           
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 20, noOfCopies: 15, price: 90.00,id: newPrice.key }); 
            newPrice = dbRef.push();           
            newPrice.set ({ noOfPages: 20, noOfCopies: 20, price: 99.00,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 20, noOfCopies: 25, price: 117.75,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 20, noOfCopies: 30, price: 131.50,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 20, noOfCopies: 40, price: 159.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 20, noOfCopies: 50, price: 186.50,id: newPrice.key }); 
     
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 24, noOfCopies: 15, price: 106.00,id: newPrice.key }); 
            newPrice = dbRef.push();           
            newPrice.set ({ noOfPages: 24, noOfCopies: 20, price: 121.00,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 24, noOfCopies: 25, price: 136.00,id: newPrice.key }); 
            newPrice = dbRef.push();          
            newPrice.set ({ noOfPages: 24, noOfCopies: 30, price: 151.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 24, noOfCopies: 40, price: 181.00,id: newPrice.key }); 
            newPrice = dbRef.push();
            newPrice.set ({ noOfPages: 24, noOfCopies: 50, price: 211.00,id: newPrice.key }); 

           
        }catch (error){
            alert(`failed upload: ${error}`);
        };         
    }
    seedPages(){
        console.log("seed pages method");
        let brochurePages = ["Front Cover", "Season Overview", "Team Batting", "Team Bowling", "Fielding", "Batsmen", "Bowlers", "Batting Statistics", "Bowling Statistics", "Innings, Spells", "Back Cover","Appearances"];
        let extraPages = ["MS-ClosestBattingFirst", "MS-ClosestBattingSecond","MS-BiggestWinBattingFirst", "MS-BisggestWinBattingSecond", "Players Player", "BatsmanOfTheSeason", "BowlerOfTheSeason"];
        let dbRef = firebase.database().ref('pages/');
        let storageRef = firebase.storage().ref();
        let filepath : string;
        
        let basePath:string = '/pages';
        
     //images needed loop from directory.img name = page name. can check page name. if not exist - log & leave
     //only call seed once
        for(let page in brochurePages){
            console.log("setting storage for pages " + brochurePages[page]);
            let childPath = "pages/" + brochurePages[page] + ".png";
                       
            storageRef.child(childPath).getDownloadURL().then(function(url) {
                              
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                  var blob = xhr.response;
                  
                };
                xhr.open('GET', url);
                xhr.send();
              
                let dbRef = firebase.database().ref('pages/');
                let newPages = dbRef.push();
                console.log("setting data for pages saving");                    
                newPages.set ({ pageNumber: page, pageName: brochurePages[page],  img: url, id: newPages.key});         
                
               
              }).catch(function(error) {
                // Handle any errors
              });
        
                    
                    
        }

        console.log("setting data for extra pages ");       
        for(let page in extraPages){
                let curPath = "gs://sportingvisuals-c8349.appspot.com/pages/" + brochurePages[page] + ".png";
            
        
           
                    let url = curPath;
                    let dbRef = firebase.database().ref('pages/');
                    let newPages = dbRef.push();
                    newPages.set ({ pageNumber: page, pageName: brochurePages[page], extra: true, img: url, id: newPages.key});         
                  
        }
        
    }

  /*  fileLoad(filename: string) {
        
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name; 
        myReader.readAsDataURL();

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
        return  this.imageSRC.substring(23) 

    }
*/
  
}