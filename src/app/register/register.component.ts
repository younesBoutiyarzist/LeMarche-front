import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @Output() backEvent = new EventEmitter<boolean>();

  registerForm = new FormGroup({
    Type: new FormControl(''),
    Username: new FormControl(''),
    Email: new FormControl('',Validators.email),
    Password: new FormControl('', Validators.minLength(8)),
    Compte: new FormControl('', Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")),
    Position_x: new FormControl('', Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")),
    Position_y: new FormControl('', Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"))
  });

  email = this.registerForm.get("Email");
  username = this.registerForm.get("Username");
  mdp = this.registerForm.get("Password");
  balance = this.registerForm.get("Compte");
  posX = this.registerForm.get("Position_x");
  posY = this.registerForm.get("Position_y");
  
  hide = true;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  getErrorMessageEmail() {
    if(this.email != null){
      if (this.email.hasError('required')) {
        return 'You must enter your email';
      }
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    return "";
  }
  getErrorMessageUsername() {
    if(this.username != null){
      if (this.username.hasError('required')) {
        return 'You must enter a name';
      }
    }
    return "";
  }
  getErrorMessageMdp() {
    if(this.mdp != null){
      if (this.mdp.hasError('required')) {
        return 'You must enter a password';
      } else {     
        return 'Your password must be at least 8 characters';
      }
    }
    return "";
  }
  getErrorMessageBalance() {
    if(this.balance != null){
      if (this.balance.hasError('required')) {
        return 'You must enter your balance';
      } else {
        return 'Your must enter a number';
      }
    }
    return "";
  }
  getErrorMessagePosX() {
    if(this.posX != null){
      if (this.posX.hasError('required')) {
        return 'You must enter your longitude';
      } else {
        return 'Your must enter a number, i.e. -77.0364';
      }
    }
    return "";
  }
  getErrorMessagePosY() {
    if(this.posY != null){
      if (this.posY.hasError('required')) {
        return 'You must enter your latitude';
      } else {
        return 'Your must enter a number, i.e. 45.241';
      }
    }
    return "";
  }

  back() {
    this.backEvent.emit(true);
  }

  Submit(){
    if (!this.registerForm.invalid) {
      if (this.registerForm.value.Type.localeCompare("Customer")) {
        this.api.addCustomer(this.registerForm.value.Username, Number(this.registerForm.value.Position_x),
        Number(this.registerForm.value.Position_y), Number(this.registerForm.value.Compte)).subscribe((data:any) => {
          this.api.idUser = 0;
          this.api.typeUser = "Customer";
          //TO DO
      }

        );
      } else {
        this.api.addSeller(this.registerForm.value.Username, Number(this.registerForm.value.Position_x),
        Number(this.registerForm.value.Position_y), Number(this.registerForm.value.Compte)).subscribe((data:any) => {
          this.api.idUser = 0;
          this.api.typeUser = "Customer";
          //TO DO
      })

      }
    } 
  }

}
