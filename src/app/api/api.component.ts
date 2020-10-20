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
  priceCrypto = [];
  cryptoToDisplay = [];
  search = "test";
  nameCrypto = [
    {
      nameSrc: 'Bitcoin',
      nameTarget: 'btceur'
    },
    {
      nameSrc: 'Ethereum',
      nameTarget: 'etheur'
    },
    {
      nameSrc: 'Tether',
      nameTarget: 'usdteur'
    },
    {
      nameSrc: 'XRP',
      nameTarget: 'xrpeur'
    },
    {
      nameSrc: 'Bitcoin Cash',
      nameTarget: 'bcheur'
    }
  ]

  getCrypto(name) {
    interface Price {
      result: {
        price
      }
    };
    this.http.get<Price>('http://localhost:4200/apiRequest/markets/kraken/' + name + '/price?apikey=0L9EW8LR7VATYY5II0LZ')
      .subscribe((value) => this.req = value.result.price);
  }

  checkInput() {
    this.cryptoToDisplay = [];
    this.nameCrypto.map((item) => {
      for (let i = 0; i < this.search.length; i++)
        if (this.search.toLowerCase()[i] != item.nameSrc.toLowerCase()[i])
          return false;
      this.cryptoToDisplay.push(item.nameSrc);
    });
  }

  ngOnInit() {
  }
}
