import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from './../product.service';
import { Product } from 'src/app/Shared/models/product';
import { Category } from './../../Shared/models/Category';
import { CategoryService } from './../category.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainResponse } from 'src/base/model/MainResponse.model';
import { ImageService } from 'src/app/Shared/service/Image.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit-add',
  templateUrl: './product-edit-add.component.html',
  styleUrls: ['./product-edit-add.component.css']
})
export class ProductEditAddComponent implements OnInit {
  categories: Category[] = [];
  imgLoading: boolean = false;
  @ViewChild('fileUpload') fileUpload: any;
  imageUrl:string=environment.imageUrl;

  productForm = new FormGroup({
    Name: new FormControl('', [Validators.required,Validators.pattern("[ء-ي0-9 ]+")]),
    NameEn: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9 ]+$")]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required, Validators.min(1)]),
    CategoryId: new FormControl('', [Validators.required]),
    HasAvailableStock: new FormControl(false),
    Image: new FormControl('',[Validators.required]),
  });

  id: string = '';
  product!: Product;

  constructor(private _categoryService: CategoryService, private _productService: ProductService,
    private _imageService: ImageService, private route: ActivatedRoute,
    private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id != '0') {
      this.getProductById(this.id);
    }
    else {
      this.product = Object.assign({}, {}) as Product;
      this.setProductData(this.product);
    }

    this.getAllCategories();
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe(data => {
      this.categories = data.Data
    });
  }

  getDataFromForm(): Product {
    let product = Object.assign({}, this.productForm.value) as Product;
    product.Id = this.id;
    return product;

  }

  checkFormValidation(): boolean {
    if (!this.productForm.invalid) {
      return true;
    }
    else {
      const controls = this.productForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          controls[name].markAsTouched();
        }
      }
      return false;
    }
  }

  save(): void {
    if (this.checkFormValidation()) {
      let productModel = this.getDataFromForm();
      if (this.id != '0') {
        this.updateProduct(productModel);
      } else {
        this.createProduct(productModel);
      }
    }
  }



  addRole() {
    this.productForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9 ]+$")]),
      ArName: new FormControl('', [Validators.required, Validators.pattern("[ء-ي0-9 ]+")]),
    });
  }

  updateProduct(product: Product) {
    this._productService.UpdateProduct(product)
      .subscribe((data: MainResponse<string>) => {
        if (data) {
          this.cancel();
        }
        else {
          this.messageService.add({ severity: 'error', summary: "Error", detail: "Error occures", life: 20000 });

        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: "Error", detail: err, life: 20000 });

      });
  }

  createProduct(product: Product) {
    this._productService.CreateProduct(product)
      .subscribe((data: boolean) => {
        if (data) {
          this.cancel();
        }
        else {
          this.messageService.add({ severity: 'error', summary: "Error", detail: "Error occures", life: 20000 });

        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: "Error", detail: err, life: 20000 });
      });
  }

  setProductData(product: Product) {
    this.productForm.patchValue(product);
  }

  onSelectCategory(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.productForm.value.CategoryId = target.value;
  }
  stockChange(inpCheckbox: HTMLInputElement) {
    this.productForm.value.HasAvailableStock = this.product.HasAvailableStock = inpCheckbox.checked;
  }

  uploadImage(selectedImage: any) {
    this.imgLoading = true;
    let imgToUpload = selectedImage.files[0];

    var validImg = this._imageService.isvalidImage(imgToUpload);

    if (imgToUpload && validImg) {
      this._imageService.postImage(imgToUpload).subscribe(
        response => {
          this.product.Image = response.Data[0];
          this.productForm.get('Image')?.setValue(response.Data[0]); 
          this.fileUpload.clear();

          this.imgLoading = false;
        }, (error) => {
          this.imgLoading = false;
        });
    }
    else
      this.imgLoading = false;
  }

  getProductById(id: string) {
    this._productService.getProductById(id).subscribe(data => {
      this.product = data.Data;
      this.setProductData(this.product);
    });
  }

  cancel() {
    this.router.navigate(['/product/view-product']);
  }
}
