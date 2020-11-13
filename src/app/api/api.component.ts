import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams, HttpHeaderResponse } from '@angular/common/http';

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
    interface Price {
      result: {
        price: {
          name,
          change: {
            percentage
          }
        }
      }
    }
    if (name != null) {
      this.http.get<Price>('http://localhost:4200/apiRequest/markets/kraken/'
                            + name + '/summary?apikey=yourAPIKey')
        .subscribe(value => {
          value.result.price.name = this.actualName;
          value.result.price.change.percentage = Math.round(value.result.price.change.percentage * 10000) / 100;
          this.req.push(value.result.price);
        });
      console.log(this.req);
      console.log(this.actualName);
    }
  }

  apiUpdate() {
    interface Price {
      result: {
        price: {
          name,
          change: {
            percentage
          }
        }
      }
    }
    if (this.req.length > 0)
      this.req.forEach((item, index) => {
        let name = this.getTargetName(item.name);
        this.http.get<Price>('http://localhost:4200/apiRequest/markets/kraken/'
                              + name + '/summary?apikey=yourAPIKey')
          .subscribe(value => {
            value.result.price.name = item.name;
            value.result.price.change.percentage = Math.round(value.result.price.change.percentage * 10000) / 100;
            this.req[index] = value.result.price;
          });
      });
    console.log(this.req);
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
    setInterval(() => {
      this.apiRequest(this.apiUpdate());
    }, 15000);
  }
}
