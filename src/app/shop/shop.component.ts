import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/adminShared/user.service';
import { Order } from '../admin/adminShared/entities/order';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    orders: Order[];

    constructor( private userSVC: UserService, private router: Router ){} 

    ngOnInit(){
        this.getOrders();
    }

    getOrders(){
        let dbRef = firebase.database().ref('orders/')
        dbRef.once('value')
            .then((snapshot)=> {
                let tmp: string[] = snapshot.val();
                this.orders = Object.keys(tmp).map(key => tmp[key])
            });
    }

    chooseOrder(order: Order) {
        this.router.navigate(['/order', order.id]);
    }   

}
