import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    url = environment.baseUrl + 'Category/';
    constructor(private http: HttpClient) { }


    getAllCategories() {
        return this.http.get<any>(this.url + 'GetAllCategories');
    }

}