import {Inject, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../models/product.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuantityComponent } from '../dialog-quantity/dialog-quantity.component';
import { Element } from '../models/element.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  list_product: Product[] = [
    new Product({"id":0,"name":"pomme","price":0.2}),
    new Product({"id":1,"name":"poire","price":10}),
    new Product({"id":2,"name":"joe","price":3000.0})
  ];
  basket: Element[] = []; 

  constructor(public dialog: MatDialog) { }

  myControl = new FormControl();
  products_name: string[] = [];
  products_price: number[] = [];

  filteredOptions: Observable<string[]> | any ;

  ngOnInit() {
    for(var p of this.list_product ) {
      this.products_name?.push(p.name != undefined ? p.name : "null");
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string):Product[] {
    const filterValue = value.toLowerCase();
    let list_index: number[] = [];
    let list_product_filter: Product[] = [];
    this.products_name?.filter((name, index) => {
      if(name.toLowerCase().includes(filterValue))
        {
          list_index.push(index);
        } 
    });
    let n = 0;
    while (n < list_index.length) {
      list_product_filter.push(this.list_product[list_index[n]]);
      n++;
    }
    return list_product_filter;
  }


  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogQuantityComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let quantity = result;
      var found = this.list_product.find(function(product) {
        return product.id == id;
      });
      if (Number.isInteger(quantity)) {
        this.basket.push({
          "name" : found?.name,
          "quantity" : quantity
        })
    }
    });
  }
}
