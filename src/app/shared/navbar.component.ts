import{Component} from '@angular/core';

@Component({
    selector: 'navi-bar',
    template: `
            <div class="top-bar">
                <div class="top-bar-titile">Sporting Visuals</div>  
                <div>
                    <ul class="menu">
                        <li class="nav-menu"><a href="#">Home</a></li>
                        <li class="nav-menu"><a [routerLink]="['/sample']">View Sample</a></li>
                        <li class="nav-menu"><a [routerLink]="['/createBrochure']">Order Brochure</a></li>
                        <li class="nav-menu"><a href="#">My Brochures</a></li>
                        <li class="nav-menu"><a [routerLink]="['/contact']">Contact Us</a></li>
                        <li class="nav-menu"><a [routerLink]="['/admin']">Admin</a></li>
                        <li class="nav-menu"><a [routerLink]="['/cart']">Cart</a></li>
                        <li class="nav-menu"><a [routerLink]="['/shop']">Shop</a></li>
                    </ul>
                </div>
            </div>`,
    styleUrls: ['./navbar.component.css']
})
export class NavComponent{}