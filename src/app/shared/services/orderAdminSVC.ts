import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {Order} from '../../admin/adminShared/entities/order';

@Injectable()

export class OrderAdminService{

    constructor(//private af: AngularFire, 
        //private db: AngularFireDatabase
    ){}
    private basePath:string = '/orders';
    private uploadTask: firebase.storage.UploadTask;
    private db = firebase.database().ref(`${this.basePath}/`);

    pushOrder(order: Order ){
      
        alert("order uploading to storage .... " + order.id );

        if(order != null){
            this.uploadImageAsPromise(order.clubLogo);
            this.uploadImageAsPromise(order.sponsor);
            this.uploadImageAsPromise(order.statisticsSource);
            this.uploadImageAsPromise(order.resultsSource);
        }                       
        try{
            this.saveFileData(order)
        }catch(error ){
            console.log("error occured saving brochure to database " + error);
        }
          
    }
    private saveFileData(order: Order){
       //this.db.list(`${this.basePath}/`).push(brochure);
       //brochure.dateCreated = new Date();
       console.log("saving to the database...");       
       this.db.push(order);
    }
  
    
    //Handle waiting to upload each file using promise
    private uploadImageAsPromise (orderFile: File) {
        return new Promise(function (resolve, reject) {
            //var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);
            let storageRef = firebase.storage().ref();
            this.uploadTask = storageRef.child(`${this.basePath}/${orderFile.name}`).put(orderFile);
            
            //Upload file
           // var task = storageRef.put(imageFile);
    
            //Update progress bar
            this.uploadTask.on('state_changed',
                function progress(snapshot: any){
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    //uploader.value = percentage;
                },
                function error(err:any){
    
                },
                function complete(){
                    var orderFile = this.uploadTask.snapshot.downloadURL;
                }
            );
        });
    }


  /*  let storageRef = firebase.storage().ref();
    if(storageRef != null){
       // alert("storage upload" + `${this.basePath}/${brochure.brochurePDF.name}`  );
       // alert("storage upload" + brochure.brochurePDF  );
        this.uploadTask = storageRef.child(`${this.basePath}/${order.clubLogo.name}`).put(order.clubLogo);
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>{
        //   brochure.progress = (snapshot.bytesTransferred / snapshot.TotalBytes ) * 100
            console.log("brochure uploading.... ")
        },
        (error) =>{
            console.log(error)
        },
        (complete){
            var downloadURL = uploadTask.snapshot.downloadURL;
        },
        () =>{

*/

 /*   deleteBrochure(brochure: Brochure){
        this.deleteFileData(brochure.id)
        .then(() =>{
            this.deleteFileStorage(brochure.title)
        })
        //.catch(error => console.log(error))
    }
*/

    removeOrder(deleteOrder: Order){
        let dbRef = firebase.database().ref('orders/').child(deleteOrder.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`orders/${deleteOrder.clubLogo}`)
            .delete()
                .then(function() {
                    alert(`${deleteOrder.clubLogo} was deleted from Storage`);
                    let imageRef = firebase.storage().ref().child(`orders/${deleteOrder.sponsor}`)
                    .delete()
                        .then(function() {
                            alert(`${deleteOrder.sponsor} was deleted from Storage`);
                            let imageRef = firebase.storage().ref().child(`orders/${deleteOrder.statisticsSource}`)
                            .delete()
                                .then(function() {
                                    alert(`${deleteOrder.statisticsSource} was deleted from Storage`);
                                    let imageRef = firebase.storage().ref().child(`orders/${deleteOrder.resultsSource}`)
                                    .delete()
                                        .then(function() {
                                            alert(`${deleteOrder.resultsSource} was deleted from Storage`);
                                            
                                        }).catch(function(error) {
                                            alert(`Error - Unable to delete ${deleteOrder.resultsSource}`);
                                        });
                                }).catch(function(error) {
                                    alert(`Error - Unable to delete ${deleteOrder.statisticsSource}`);
                                });
                        }).catch(function(error) {
                            alert(`Error - Unable to delete ${deleteOrder.sponsor}`);
                        });
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deleteOrder.clubLogo}`);
                });
        
    }
    editOrder(update: Order){
          
      if(update != null){
        this.uploadImageAsPromise(update.clubLogo);
        this.uploadImageAsPromise(update.sponsor);
        this.uploadImageAsPromise(update.statisticsSource);
        this.uploadImageAsPromise(update.resultsSource);                       
        try{
            let dbRef = firebase.database().ref('orders/').child(update.id)
            .update({
                username: update.username,
                email: update.email,
                selectedPageBundle: update.selectedPageBundle,
                selectedCopiesBundle: update.selectedCopiesBundle,
                price: update.price,
                clubName: update.clubName,
                teamName: update.teamName,
                clubLogo: update.clubLogo,
                sponsor: update.sponsor,
                statisticsSource: update.statisticsSource,
                resultsSource: update.resultsSource,
                battingAverages: update.battingAverages,
                bowlingAverages: update.bowlingAverages,
                extraPages: update.extraPages,
                id: update.id           
            });
        }catch(error ){
            console.log("error occured saving brochure to database " + error);
        }
        alert('order updated'); //change this to short transition fade message
    } 
}
/*
    private deleteFileData(key: string){
       //return this.db.list(`${this.basePath}/`).remove(key);
      //  return this.db.remove(key);
    }
    private deleteFileStorage(name: string){
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
    }
/*----------------- video methods
    createBrochure(brochure: Brochure){
        let storageRef = firebase.storage().ref();
        storageRef.child(`brochures/${brochure.title}`).put(brochure.brochurePDF)
            .then((snapshot) => { 
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('brochures/');
                let newBrochure = dbRef.push();
                newBrochure.set ({
                    title: brochure.title,
                    sport: brochure.sport,
                    brochurePDF: File,
                    url: url,
                    $id: newBrochure.key
                });         
            })
            .catch ((error)=>{
                alert(`failed upload: ${error}`);
            });            
    }

    editPost(update: Brochure){
        let dbRef = firebase.database().ref('brochures/').child(update.$id)
            .update({
                title: update.title
            });
        alert('post updated');    
       
    }

    removePost(deletePost: Brochure){
        let dbRef = firebase.database().ref('brochures/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`brochures/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deletePost.title} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deletePost.title}`);
                });
    } */

}