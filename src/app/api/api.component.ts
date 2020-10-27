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

  req = []; // Reponse de la requête
  cryptoToDisplay = [];  // Liste des cryptos à afficher dans les suggestions de la recherche
  search = "";  // Valeur de l'input recherche
  data;  // Cryptos présentent dans la bdd, contenant leur nom officiel et leur id de requête
  actualName = ""; // Nom de la crypto à afficher

  getTargetName(nameSrc) {
    let nameTarget;

    this.data.map((item) => {
      if (nameSrc === item.nameSrc)
        nameTarget = item.nameTarget;
    });
    return nameTarget;
  }

  reqIsFilled() {
    for (const element in this.req)
      if (this.req[element] == null)
        return false;
    return true;
  }

  apiRequest(name) {
    if (name != null) {
      interface Result {
        result: {
          price: {
            name: string,
            last: number,
            high: number,
            low: number,
            change: {
              percentage: number,
              absolute: number
            }
          }
        }
      }
      this.http.get<Result>('http://localhost:4200/apiRequest/markets/kraken/'
                            + name + '/summary?apikey=0L9EW8LR7VATYY5II0LZ')
        .subscribe(value => {
          value.result.price.name = this.actualName;
          this.req.push(value.result.price);
        });
      console.log(this.req);
      console.log(this.actualName);
    }
  }

  getCrypto(name) {
    this.cryptoToDisplay = [];
    this.search = "";
    this.actualName = name;

    name = this.getTargetName(name);
    this.apiRequest(name);
  }

  checkInput() {
    this.cryptoToDisplay = [];
    this.data.map((item) => {
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
      .then(response => this.data = response);
  /*  setInterval(() => {
      this.apiRequest(this.getTargetName(this.actualName));
    }, 5000);*/
  }
}
