import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { ProductModule } from './Product/product.module';
import { AuthGuard } from './Shared/helpers/auth.guard';


export const AppRoutes: Routes = [
  { path: '', component:LoginComponent, canActivate: [AuthGuard] },
  { path: 'product', loadChildren: () => ProductModule},

{
path: '**',
  redirectTo: 'dashboard'
}
]
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
