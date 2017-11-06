//import { CreateComponent } from './../CreateComponent/create.component';
import { OrderAdminComponent } from './orderAdmin/order-admin.component';
import { BrochureSeedService } from './adminShared/brochure-seed.service';
import { BrochureAddComponent } from './brochureAdd/brochure-add.component';


import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent }  from './adminMenu/admin-menu.component';
import { LoginComponent }    from './login/login.component';
import { SignUpComponent }    from './signUp/sign-up.component';

import { UserService } from './adminShared/user.service';
import {BrochureAdminService} from './adminShared/brochure-admin.service'
import {BrochureAdminComponent} from './brochureAdmin/brochure-admin.component'
import { SafePipe } from './adminShared/safe.pipe';


const AdminRoutes: Routes = [
    { 
        path: 'admin',  
        component: AdminComponent, 
        children: [
            { path: 'brochure-admin', component: BrochureAdminComponent, canActivate: [UserService] },
            { path: 'order-admin', component: OrderAdminComponent, canActivate: [UserService] },     
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    },
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignUpComponent,
        BrochureAdminComponent,
        BrochureAddComponent,
        OrderAdminComponent,
        SafePipe,
       // CreateComponent
    ],
    providers: [
        UserService,
        BrochureAdminService,
        BrochureSeedService
    ]
})
export class AdminModule {}

