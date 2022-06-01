import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Personne } from '../models/personne.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  IsRegister = true;
  IsConnected = this.api.idUser != undefined;
  @Output() ValidateEvent = new EventEmitter<boolean>();


  loginForm = new FormGroup({
    Type: new FormControl(''),
    Username: new FormControl(''),
    Password: new FormControl('', Validators.minLength(8))
  });

  MoneyForm = new FormGroup({
    Money: new FormControl(''),
  });

  username = this.loginForm.get("Username");
  mdp = this.loginForm.get("Password");
  personne : Personne | undefined;
  hide = true;

  constructor(public api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getErrorMessageUsername() {
    // A modifier avec la base de donner, verifier qu'il existe et correspond a son mdp
    if(this.username != null){
      if (this.username.hasError('required')) {
        return 'You must enter a name';
      }
    }
    return "";
  }
  getErrorMessageMdp() {
    // A modifier avec la base de donner, verifier qu'il existe et correspond a son username
    if(this.mdp != null){
      if (this.mdp.hasError('required')) {
        return 'You must enter a password';
      } else {
        return 'Your password must be at least 8 characters';
      }
    }
    return "";
  }


  reverseRegister() {
    this.IsRegister = !this.IsRegister;
  }
  emit() {
    this.ValidateEvent.emit(true);
  }

  deleteAccount() {
   if ( this.api.typeUser == "Customer") {
      this.api.removeCustomer(this.api.idUser? this.api.idUser : 0).subscribe((data :any) => {
        this.IsConnected = false;
      })
   } else {
    this.api.removeSeller(this.api.idUser? this.api.idUser : 0).subscribe((data :any) => {
      this.IsConnected = false;
    })

   }
  }

  addMoney() {
    this.api.addMoney(this.api.idUser? this.api.idUser : 0, this.MoneyForm.value.Money).subscribe((data: any) => {

    });
  }
  
  Submit(){
    if (!this.loginForm.invalid) {
      if (this.loginForm.value.Type == "Customer") {
        this.api.loginCustomer(this.loginForm.value.Username, this.loginForm.value.Password).subscribe( 
          (data:any) => {
          this.personne = data;
          this.api.idUser =  this.personne?.id;
          this.api.typeUser = "Customer";
          this.ValidateEvent.emit(true);
          this._snackBar.open( 'connected' ,'' , {
            duration: 2000,
         });
      }, (error) => {                              //Error callback
        this._snackBar.open( 'error password', '',{
          duration: 2000,
       } );
      });
      } else {
        this.api.loginSeller(this.loginForm.value.Username, this.loginForm.value.Password).subscribe((data:any) => {
          this.personne = data;
          this.api.idUser =  this.personne?.id;
          this.api.typeUser = "Seller";
          this.ValidateEvent.emit(true);
          this._snackBar.open( 'connected', ' ', {
            duration: 2000,
         });
      }, (error) => {                              //Error callback
        this._snackBar.open( 'error password', ' ', {
          duration: 2000,
       } );
      });

      }
    } 
  }
}
