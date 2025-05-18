import { Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { PlantFormComponent } from './plant/plant-form/plant-form.component';
import { ContactComponent } from './contact/contact.component';
import { PlantTipsComponent } from './plant-tips/plant-tips.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlantShopComponent } from './plant/plant-shop/plant-shop.component';
import { PlantDetailComponent } from './plant/plant-detail/plant-detail.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
}, {
    
    path: 'home', component: HomeComponent
},{
    
    path: 'contact', component: ContactComponent
}, {
    path: 'plant', component: PlantComponent
    
    path: 'planttips',
    loadComponent: () => { 
        return import('./plant/plant-tips/plant-tips.component').then(m => m.PlantTipsComponent)
    }
}, {
    path: 'contact',
    loadComponent: () => { 
        return import('./contact/contact.component').then(m => m.ContactComponent)
    }
}, {
    path: 'plant',
    loadComponent: () => { 
        return import('./plant/plant.component').then(m => m.PlantComponent)
    }
}, { 
    path: 'plants', component: PlantComponent 
}, { 
    path: 'plants/new', component: PlantFormComponent 
}, {
   path: 'plants/shop', component: PlantShopComponent
}, {

    path: 'login', component: LoginComponent
}, {
    path: 'register', component: RegisterComponent
}



}, { 
    path: 'plants/edit/:id', component: PlantFormComponent 
}, {
    path: 'plants/show/:id', component: PlantDetailComponent
}, {
    path: 'cart', component: CartComponent
}
];
