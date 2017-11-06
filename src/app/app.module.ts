import { CreateComponent } from './CreateComponent/create.component';
import { ContactComponent } from './ContactComponent/contact.component';
import { SampleComponent } from './sample/sample.component';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './start/app.component';
import {NavComponent} from './shared/navbar.component'
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {AppRoutingModule} from './shared/app.routing';
import {AdminModule} from './admin/admin.module';
import { FormsModule }   from '@angular/forms';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { DatepickerModule } from 'angular2-material-datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ValuesPipe} from './shared/values.pipe'

import { ShopComponent } from './shop/shop.component';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { CartComponent } from './cart/cart.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AdminModule,
        AppRoutingModule,
        Ng2CarouselamosModule,
        DatepickerModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        ErrorComponent, 
        SampleComponent,
        ContactComponent,
        CreateComponent,
        ValuesPipe,
        ShopComponent,
        CartComponent
        
    ],
    providers: [
        ShoppingCartService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
