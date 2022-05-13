import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  list_product = [{"id":0,"name":"pomme","price":0.2},{"id":1,"name":"poire","price":0.2},{"id":2,"name":"joe","price":3000.0}];

  constructor() { }

  ngOnInit(): void {
  }

}
