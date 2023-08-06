import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgxLoadingModule } from 'ngx-loading';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductRouting } from './product.routing';
import { ProductEditAddComponent } from './product-edit-add/product-edit-add.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductLayoutComponent } from './product-layout/product-layout.component';


@NgModule({
  declarations: [
    ProductViewComponent,
    ProductEditAddComponent,
    ProductLayoutComponent
  ],
  imports: [
    MultiSelectModule,
    AutoCompleteModule,
    NgxLoadingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ProductRouting),
    TableModule,
    DialogModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule
    ],
  providers: [TranslatePipe]
})
export class ProductModule { }
