import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {Brochure} from '../adminShared/brochure';

@Injectable()

export class BrochureAdminService{

    constructor(//private af: AngularFire, 
        //private db: AngularFireDatabase
    ){}
    private basePath:string = '/brochures';
    private uploadTask: firebase.storage.UploadTask;
    private db = firebase.database().ref(`${this.basePath}/`);

    pushBrochure(brochure: Brochure ){
        let storageRef = firebase.storage().ref();
        alert("brochure uploading to storage .... " + brochure.id );
        if(storageRef != null){
           // alert("storage upload" + `${this.basePath}/${brochure.brochurePDF.name}`  );
           // alert("storage upload" + brochure.brochurePDF  );
            
            this.uploadTask = storageRef.child(`${this.basePath}/${brochure.brochurePDF.name}`).put(brochure.brochurePDF);
            this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
            //   brochure.progress = (snapshot.bytesTransferred / snapshot.TotalBytes ) * 100
                console.log("brochure uploading.... ")
            },
            (error) =>{
                console.log(error)
            },
            () =>{
                console.log("upload of file to storage sucessful: " + brochure.url + " adding to database");
                brochure.url = this.uploadTask.snapshot.downloadURL;
                console.log("brochure url " + brochure.url);
                brochure.title = brochure.brochurePDF.name ;                 
                console.log("brochure title " + brochure.title);
                   try{
                this.saveFileData(brochure)
                   }catch(error ){
                        console.log("error occured saving brochure to database " + error);
                   }
            })
        }else{
            console.log("unable to get reference to firebase storage");
        }
    }
    private saveFileData(brochure: Brochure){
       //this.db.list(`${this.basePath}/`).push(brochure);
       brochure.dateCreated = new Date();
       console.log("saving to the database...");       
       this.db.push(brochure);
    }
 /*   deleteBrochure(brochure: Brochure){
        this.deleteFileData(brochure.id)
        .then(() =>{
            this.deleteFileStorage(brochure.title)
        })
        //.catch(error => console.log(error))
    }
*/

    removeBrochure(deleteBrochure: Brochure){
        let dbRef = firebase.database().ref('brochures/').child(deleteBrochure.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`brochures/${deleteBrochure.title}`)
            .delete()
                .then(function() {
                    alert(`${deleteBrochure.title} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deleteBrochure.title}`);
                });
    }
    editBrochure(update: Brochure){
        let dbRef = firebase.database().ref('brochures/').child(update.id)
            .update({
                title: update.title
            });
        alert('post updated');    
       
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