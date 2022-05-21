import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  IsRegister = true;
  IsConnected = this.api.idUser != undefined;

  loginForm = new FormGroup({
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

  Submit(){
    console.log('workin');
    if (this.loginForm.invalid) {
      return;
    } else {
      console.log(this.loginForm.value);
      //envoie info au back
    }
  }
}
