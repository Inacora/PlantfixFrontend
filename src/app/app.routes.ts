import { Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { PlantFormComponent } from './plant/plant-form/plant-form.component';
import { PlantShopComponent } from './plant-shop/plant-shop.component';
import { ContactComponent } from './contact/contact.component';
import { PlantTipsComponent } from './plant-tips/plant-tips.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
}, {
    
    path: 'home', component: HomeComponent
},{
    
    path: 'planttips', component: PlantTipsComponent
}, {
    
    path: 'contact', component: ContactComponent
}, {
    path: 'plant', component: PlantComponent
    
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



];
