import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams, HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  constructor(private http: HttpClient) { }

  req;
  nameCrypto = {
    'Bitcoin': 'btceur',
    'Etherum': 'etheur',
    'Tether': 'usdteur',
    'Xrp': 'xrpeur',
    'Bitcoin Cash': 'bcheur'
  };
  priceCrypto = [];
  test = "test";

  getCrypto(name) {
    interface Price {
      result: {
        price
      }
    };
    this.http.get<Price>('http://localhost:4200/apiRequest/markets/kraken/' + name + '/price?apikey=0L9EW8LR7VATYY5II0LZ')
      .subscribe((value) => this.req = value.result.price);
  }

  ngOnInit() {
    this.getCrypto('btceur');
  }
}
