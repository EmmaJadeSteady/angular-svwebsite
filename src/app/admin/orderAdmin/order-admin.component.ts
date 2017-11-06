import { Order } from './../adminShared/entities/order';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../adminShared/user.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {OrderAdminService} from '../../shared/services/orderAdminSVC';

import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';



@Component({
    templateUrl: './order-admin.component.html',
    styleUrls: ['./order-admin.component.css']
})

export class OrderAdminComponent implements OnInit{
    theUser: string;
    menuChoice: string;
    orders : Order[];
    formDisplay: boolean = true;
    singleOrder: Order;

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getOrders();
    }
    constructor(protected _sanitizer: DomSanitizer,
        private userSVC: UserService,
        private router: Router,
        private orderAdminService: OrderAdminService
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
    getOrders(){
        let dbRef = firebase.database().ref('orders/');
        dbRef.once('value')
            .then((snapshot) =>{
                let tmp: string[] = snapshot.val();
                this.orders = Object.keys(tmp).map(key => tmp[key])
                console.log("orders found " + this.orders);
                
            });
    }
    editOrder(theOrder: Order){
        this.singleOrder = theOrder;
        this.formDisplay = false;
    }
    cancelEdit(){
        this.formDisplay = true;
    }
    updateOrder(single: Order){
        this.orderAdminService.editOrder(single);
        this.formDisplay = true;
    }
    deleteOrder(single: Order){
        let verify = confirm('Are you sure you want to delete this Order?');
        if(verify == true){
            this.orderAdminService.removeOrder(single);
            this.router.navigate(['/admin/']);
        }else{
            alert("Order has not been deleted");
        }
    }
}