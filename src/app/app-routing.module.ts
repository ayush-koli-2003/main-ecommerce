import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-display/product-list/product-list.component';
import { CartListComponent } from './cart-handler/cart-list/cart-list.component';
import { AddProductComponent } from './product-display/add-product/add-product.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:ProductListComponent},
  {path:'cart',component:CartListComponent,canActivate:[AuthGuard]},
  {path:'newProduct',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'user',loadChildren:()=> import ('./user/user.module').then(m=>m.UserModule)},
  // {path:'user/register',redirectTo:'user'},
  // {path:'**',component:NotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
