import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() backEvent = new EventEmitter<boolean>();

  registerForm = new FormGroup({
    Username: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Compte: new FormControl(''),
    Position_x: new FormControl(''),
    Position_y: new FormControl('')
    

  });

  constructor() { }

  ngOnInit(): void {
  }

  back() {
    this.backEvent.emit(true);
  }

  Submit(){
    console.log('workin');
    if (this.registerForm.invalid) {
      return;
    } else {
      console.log(this.registerForm.value);
      //envoie info au back
    }
  }

}
