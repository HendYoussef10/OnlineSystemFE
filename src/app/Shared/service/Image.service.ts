import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainResponse } from 'src/base/model/MainResponse.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private url = environment.baseUrl + 'Images';

    constructor(private http: HttpClient, private router: Router) { }

    
    postImage(imgToUpload: File): Observable<MainResponse<string[]>> {
        const formData: FormData = new FormData();
        formData.append('image', imgToUpload, imgToUpload.name);
        const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

        return this.http
            .post<MainResponse<string[]>>(this.url + `/UploadImages`, formData, { headers });
    }
    isvalidImage(file: File): boolean {
        let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bpg'];

        if (file) {
            const type = file.name.split('.')[1];
            if (allImages.includes(type.toLowerCase())) {
                return true;
            }

            else return false;
        }
        else return false;
    }
}