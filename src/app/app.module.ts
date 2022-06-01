import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './client/client.component';
import { DialogQuantityComponent } from './dialog-quantity/dialog-quantity.component';
import { VendeurComponent } from './vendeur/vendeur.component';
import { HistoryComponent } from './history/history.component';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    DialogQuantityComponent,
    VendeurComponent,
    HistoryComponent,
    DialogAddProductComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
