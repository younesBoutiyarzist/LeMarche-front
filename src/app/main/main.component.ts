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
  typeUser = '';
  section = 0;
  data :Product[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  changePage() {
    if(this.api.typeUser == 'Customer') {
      this.affichage(1);
    } else {
      this.affichage(2);
    }
  }
  affichage(i:number): void {
    this.section = i;
  }

  update() {
    this.typeUser = this.api.typeUser?  this.api.typeUser : '';
  }
}
