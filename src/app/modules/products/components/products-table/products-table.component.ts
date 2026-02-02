import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/response/GetAllProductsResponse';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];

  public productSelected!: GetAllProductsResponse;
}
