import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
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

  username = this.loginForm.get("Username");
  mdp = this.loginForm.get("Password");
  
  hide = true;

  constructor(public api: ApiService) { }

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

  Submit(){
    if (!this.loginForm.invalid) {
      if (this.loginForm.value.Type == "Customer") {
        this.api.loginCustomer(this.loginForm.value.Username, this.loginForm.value.Password).subscribe((data:any) => {
          console.log(data);
          this.api.idUser = 0;
          this.api.typeUser = "Customer";
          //TO DO
          this.ValidateEvent.emit(true);
      }

        );
      } else {
        this.api.loginSeller(this.loginForm.value.Username, this.loginForm.value.Password).subscribe((data:any) => {
          console.log(data);
          this.api.idUser = 0;
          this.api.typeUser = "Seller";
          this.ValidateEvent.emit(true);

          //TO DO
      })

      }
    } 
  }
}
