import { Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { PlantFormComponent } from './plant/plant-form/plant-form.component';
import { PlantShopComponent } from './plant-shop/plant-shop.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',

    loadComponent: () => { 
        return import('./home/home.component').then(m => m.HomeComponent)
    }
}, {
    
    path: 'planttips',
    loadComponent: () => { 
        return import('./plant-tips/plant-tips.component').then(m => m.PlantTipsComponent)
    }
}, {
    
    path: 'shop',
    loadComponent: () => { 
        return import('./shop/shop.component').then(m => m.ShopComponent)
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
    path: 'login',
    loadComponent: () => { 
        return import('./login/login.component').then(m => m.LoginComponent)
    }
}, {
    path: 'register',
    loadComponent: () => {
        return import('./register/register.component').then(m => m.RegisterComponent)
    }
}


];
