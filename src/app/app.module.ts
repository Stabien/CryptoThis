import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { SearchComponent } from './search/search.component';
import { DisplayCryptoComponent } from './display-crypto/display-crypto.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'api', component: ApiComponent},
  { path: '', component: MainComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserComponent,
    ApiComponent,
    SearchComponent,
    DisplayCryptoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
