import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public api : ApiService) { }

  ngOnInit(): void {
    if(this.api.typeUser === 'Customer') {
      this.api.purchasesHistory(this.api.idUser ? this.api.idUser : 0).subscribe( (data : any) => {
        console.log(data);
        //TO DO
      })
    }
  }

}
