import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  hasBackdrop = true;
  section = 0;
  data :any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getConfig()
    .subscribe((data: any) => {
      this.data = data;
    });
  }

  voir() {
    console.log(this.data);
  }
  affichage(i:number): void {
    this.section = i;
  }

  
}
