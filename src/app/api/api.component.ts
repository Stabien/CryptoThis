import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams, HttpHeaderResponse } from '@angular/common/http';
import { DisplayCryptoComponent } from '../display-crypto/display-crypto.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  constructor(private http: HttpClient) { }

  req = {
    name: '',
    price: '',
    high: '',
    low: '',
    percentage: '',
    absolute: ''
  }
  cryptoToDisplay = [];
  search = "";
  nameCrypto;

  getTargetName(nameSrc) {
    let nameTarget;

    if (nameSrc != '')
      this.nameCrypto.map((item) => {
        if (nameSrc === item.nameSrc)
          nameTarget = item.nameTarget;
      });
    return nameTarget;
  }

  apiRequest(name) {
    if (name != null) {
      this.http.get('http://localhost:4200/apiRequest/markets/kraken/'
                    + name + '/summary?apikey=0L9EW8LR7VATYY5II0LZ')
        .subscribe((value) => {
          this.req.price = value.result.price.last;
          this.req.high = value.result.price.high;
          this.req.low = value.result.price.low;
          this.req.percentage = Math.round(value.result.price.change.percentage * 10000) / 100;
          this.req.absolute = value.result.price.change.absolute;
        });
    }
  }

  getCrypto(name) {
    this.cryptoToDisplay = [];
    this.search = "";
    this.req.price = "";
    this.req.name = name;

    name = this.getTargetName(name);
    this.apiRequest(name);
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

    setInterval(() => {
      this.apiRequest(this.getTargetName(this.req.name));
    }, 5000);
  }
}
