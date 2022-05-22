import {Inject, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../models/product.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuantityComponent } from '../dialog-quantity/dialog-quantity.component';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { Element } from '../models/element.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {

  list_product: Product[] = [];
  

  constructor(public dialog: MatDialog, public api: ApiService) { }

  myControl = new FormControl();
  products_name: string[] = [];
  products_price: number[] = [];

  filteredOptions: Observable<string[]> | any ;

  ngOnInit() {
    this.api.getStock(0).subscribe((data:any) => {
      this.list_product = data;
      this.update();

  })
  }
  private update() {
    this.products_name = [];
    for(var p of this.list_product ) {
      this.products_name?.push(p.name != undefined ? p.name : "null");
    }
    this.products_name.sort();
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


  openDialog(id: number, nameProd:string, priceProd: number): void { //add Quantity later TO DO
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: '250px',
      data: {name: nameProd, price: priceProd},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.api.removeProduct(id);
      this.api.getStock(0).subscribe( (data :any) =>
      {
        this.list_product = data;
        this.update();
      });
    });
  }

  deleteElement(id: number) {
    
    this.api.removeProduct(id).subscribe(() => {
      this.list_product = this.list_product.filter(e => e.id != id);
      this.update();

    });
  }

  addElement() {
    
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //TO CHANGE
      this.api.listProducts().subscribe( (data :any) =>
      {
        this.list_product = data;
        this.update();
      })
    });
  }
}
