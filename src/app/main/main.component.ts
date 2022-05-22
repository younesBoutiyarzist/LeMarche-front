import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '..//models/product.model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  hasBackdrop = true;
  typeUser = this.api.typeUser;
  section = 0;
  data :Product[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  changePage() {
    console.log(this.api.typeUser);
    if(this.api.typeUser == 'Customer') {
      this.affichage(1);
    } else {
      this.affichage(2);
    }
  }
  affichage(i:number): void {
    this.section = i;
  }

  
}
