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
  section = 0;
  data :Product[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  voir() {
    console.log(this.data[0]);
  }
  affichage(i:number): void {
    this.section = i;
  }

  
}
