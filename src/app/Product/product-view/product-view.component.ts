import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Shared/models/product';
import { ProductService } from '../product.service';
import { PageInfo } from 'src/app/Shared/models/PageInfo';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  products: Product[] = [];
  dialog: boolean = false;
  product!: Product;
  noOfRows: number = 5;
  currentPage : number = 1;
  productsCount!: number;
  private setting = {
    element: {
      dynamicDownload: document.createElement('a')
    }
  }
  constructor(private _productService: ProductService, private confirmationService: ConfirmationService,
    private router: Router, private messageService: MessageService) { }

  getProductsPage() {
    let pageInfo: PageInfo = {
      NeededPage: this.currentPage,
      PageSize: this.noOfRows
    }

    this._productService.getAllProductsByPagination(pageInfo).subscribe(data => {
      this.products = data.Data
    });
  }
  getProductsCount() {

    this._productService.getProductsCount().subscribe(data => {
      this.productsCount = data.Data;
      this.getProductsPage();
    });
  }

  ngOnInit(): void {
    this.getProductsCount();
  }

  updateProduct(product: Product) {
    this.router.navigate(['/product/add-edit-product', product.Id]);
  }

  addProduct() {
    this.router.navigate(['/product/add-edit-product', 0]);
  }



  deleteProduct(id: string) {
    let message = 'Confirmayion';

    this.confirmationService.confirm({
      message: "Are you sure to delete this item",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productService.deleteProductById(id).subscribe(e => {
          if (e.Data) {
            this.messageService.add({ severity: 'success', summary: "success", detail: "Deleted successfully", life: 20000 });
            this.getProductsPage();
          }
          else {
            this.messageService.add({ severity: 'error', summary: "Error", detail: "server error", life: 20000 });

          }
        }
          , ((err: any) => {
            this.messageService.add({ severity: 'error', summary: "Error", detail: err, life: 20000 });
          }));

      }
    });
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe(data => {
      let allProducts = data.Data;
      this.generateDownloadProductJsonUri(allProducts);
    });
  }

  generateDownloadProductJsonUri(allProducts: Product[]) {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Products.json',
      text: JSON.stringify(allProducts)
    });
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {

    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  onPageChange(event: any) {
    this.currentPage = (event.first / this.noOfRows) + 1;
    this.getProductsPage();
  }
}
