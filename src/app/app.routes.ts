import { Routes } from '@angular/router';
import { PlantComponent } from './plant/plant.component';
import { PlantFormComponent } from './plant/plant-form/plant-form.component';
import { PlantTipsComponent } from './plant/plant-tips/plant-tips.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlantShopComponent } from './plant/plant-shop/plant-shop.component';
import { PlantDetailComponent } from './plant/plant-detail/plant-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { UserComponent } from './users/user/user.component';
import { authGuard } from './auth/auth.guard';
import { OrderComponent } from './order/order.component';
import { SettingsComponent } from './settings/settings.component';
import { UserFormComponent } from './users/user-form/user-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Rutas accesibles por cualquier usuario autenticado
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'planttips', component: PlantTipsComponent, canActivate: [authGuard] },
    { path: 'plants/shop', component: PlantShopComponent, canActivate: [authGuard] },

    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    { path: 'settings/:id', component: SettingsComponent, canActivate: [authGuard] },

    // Rutas solo para administradores
    { path: 'plant', component: PlantComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'plants', component: PlantComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'plants/new', component: PlantFormComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'plants/edit/:id', component: PlantFormComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'users', component: UserComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'users/new', component: UserFormComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'users/edit/:id', component: UserFormComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'orders', component: OrderComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'orders/show/:id', component: OrderDetailComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'plants/show/:id', component: PlantDetailComponent, canActivate: [authGuard], data: { role: 'admin' } },

    // Página por defecto
    { path: '**', redirectTo: 'login' }
];

