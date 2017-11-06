import { CreateComponent } from './../CreateComponent/create.component';
import { ContactComponent } from './../ContactComponent/contact.component';
import { SampleComponent } from './../sample/sample.component';
import{NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import{HomeComponent} from '../home/home.component';
import{ErrorComponent} from '../error/error.component';




@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component:HomeComponent},
            {path: 'sample', component:SampleComponent},
            {path: 'createBrochure', component:CreateComponent},
            {path: 'contact', component:ContactComponent},
         //   {path: 'myBrochure', component: MyBrochureComponent, canActivate: [UserService] }
            {path: '**', component:ErrorComponent}
        ])
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{}
