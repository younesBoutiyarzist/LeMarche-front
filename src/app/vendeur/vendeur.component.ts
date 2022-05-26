import {Inject, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../models/product.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuantityComponent } from '../dialog-quantity/dialog-quantity.component';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { ApiService } from '../api.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {

  list_product: Item[] = [];
  

  constructor(public dialog: MatDialog, public api: ApiService) { }

  myControl = new FormControl();
  products_name: string[] = [];
  products_price: number[] = [];

  filteredOptions: Observable<string[]> | any ;

  ngOnInit() {
    console.log(this.api.idUser);
    this.api.getStock(this.api.idUser? this.api.idUser : 0).subscribe((data:any) => {
      this.list_product = data;
      console.log( this.list_product);
      this.update();

  })
  }
  private update() {
    this.products_name = [];
    for(var p of this.list_product ) {
      this.products_name?.push(p.product? p.product.name : "null");
    }
    this.products_name.sort();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

  }

  private _filter(value: string):Item[] {
    const filterValue = value.toLowerCase();
    let list_index: number[] = [];
    let list_product_filter: Item[] = [];
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


  openDialog(idProduct: number, nameProd:string, priceProd: number, quantityProd: number): void { //add Quantity later TO DO
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: '250px',
      data: {id: idProduct, name: nameProd, price: priceProd, quantity: quantityProd},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.api.removeProduct(idProduct);
      this.api.getStock(this.api.idUser? this.api.idUser : 0).subscribe( (data :any) =>
      {
        this.list_product = data;
        this.update();
      });
    });
  }

  deleteElement(id: number) {
    
    this.api.removeProduct(id).subscribe(() => {
      this.list_product = this.list_product.filter(e => e.product? e.product.id != id : true); 
      this.update();

    });
  }

  addElement() {
    
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //TO CHANGE
      console.log(this.api.idUser);
      this.api.getStock(this.api.idUser? this.api.idUser : 0).subscribe( (data :any) =>
      {
        this.list_product = data;
        this.update();
      })
    });
  }
}
