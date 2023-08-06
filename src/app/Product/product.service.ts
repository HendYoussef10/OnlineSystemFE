import { Product } from 'src/app/Shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageInfo } from '../Shared/models/PageInfo';


@Injectable({
    providedIn: 'root'
})
export class ProductService {


    url = environment.baseUrl + 'Product/';
    constructor(private http: HttpClient) { }

    getAllProducts() {
        return this.http.get<any>(this.url + 'GetAllProducts');
    }

    getAllProductsByPagination(pageInfo:PageInfo) {
        return this.http.post<any>(this.url + 'GetProductsPagination',pageInfo);
    }
    getProductById(id:string) {
        return this.http.get<any>(this.url + 'GetProductById?Id='+id);
    }
    getProductsCount() {
        return this.http.get<any>(this.url + 'GetProductsCount');
    }
    
    deleteProductById(id: string) {
        return this.http.delete<any>(this.url + 'DeleteProduct?id='+id);

    }

    UpdateProduct(updatedProduct: Product) {
        return this.http.put<any>(this.url + 'UpdateProduct', updatedProduct);
    }

    CreateProduct(product: Product) {
        return this.http.post<any>(this.url + 'CreateProduct', product);
    }
}