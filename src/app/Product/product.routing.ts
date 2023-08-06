import { Routes } from "@angular/router";
import { AuthGuard } from "../Shared/helpers/auth.guard";
import { ProductEditAddComponent } from "./product-edit-add/product-edit-add.component";
import { ProductLayoutComponent } from "./product-layout/product-layout.component";
import { ProductViewComponent } from "./product-view/product-view.component";

export const ProductRouting: Routes = [
    {
        path: '', component: ProductLayoutComponent, children: [
            { path: 'view-product', component: ProductViewComponent },
            { path: 'add-edit-product/:id', component: ProductEditAddComponent }
        ], canActivate: [AuthGuard]
    },

];

