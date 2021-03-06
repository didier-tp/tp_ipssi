import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ToggglePanelComponent } from './togggle-panel/togggle-panel.component';
import { ProductsService } from './products.service';
import { HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    ToggglePanelComponent,
    WelcomeComponent,
    LoginComponent,
    SelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule , 
    HttpClientModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
