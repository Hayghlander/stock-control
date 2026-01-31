import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/response/GetAllProductsResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) {}

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    const token = this.cookie.get('USER_INFO');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http
      .get<Array<GetAllProductsResponse>>(
        `${this.API_URL}/products`,
        httpOptions, // Usamos as opções atualizadas
      )
      .pipe(map((product) => product.filter((data) => data?.amount > 0)));
  }
}
