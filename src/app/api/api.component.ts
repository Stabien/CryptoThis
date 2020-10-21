import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams, HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  constructor(private http: HttpClient) { }

  req = {
    name: '',
    price: ''
  }
  cryptoToDisplay = [];
  search = "";
  nameCrypto;

  getTargetName(nameSrc) {
    let nameTarget;

    this.nameCrypto.map((item) => {
      if (nameSrc === item.nameSrc)
        nameTarget = item.nameTarget;
    });
    return nameTarget;
  }

  getCrypto(name) {
    interface Price {
      result: {
        price
      }
    };

    this.cryptoToDisplay = [];
    this.search = "";
    this.req.price = "";
    this.req.name = name;
    name = this.getTargetName(name);

    this.http.get<Price>('http://localhost:4200/apiRequest/markets/kraken/'
                         + name + '/price?apikey=0L9EW8LR7VATYY5II0LZ')
      .subscribe((value) => this.req.price = value.result.price);
  }

  checkInput() {
    this.cryptoToDisplay = [];
    this.nameCrypto.map((item) => {
      for (let i = 0; i < this.search.length; i++)
        if (this.search.toLowerCase()[i] != item.nameSrc.toLowerCase()[i])
          if (this.search[i] !== ' ')
            return false;
      this.search.length != 0 ? this.cryptoToDisplay.push(item.nameSrc) : null;
    });
  }

  ngOnInit() {
    fetch('../../assets/data.json')
      .then(response => response.json())
      .then(response => this.nameCrypto = response);
  }
}
