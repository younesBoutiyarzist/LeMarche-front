import {Inject, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../models/product.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuantityComponent } from '../dialog-quantity/dialog-quantity.component';
import { Element } from '../models/element.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  list_product: Product[] = [];
  basket: Element[] = []; 

  constructor(public dialog: MatDialog, public api : ApiService) { }

  myControl = new FormControl();
  products_name: string[] = [];
  products_price: number[] = [];

  filteredOptions: Observable<string[]> | any ;

  ngOnInit() {
    this.api.listProducts().subscribe((data:any) => {
      this.list_product = data;
      for(var p of this.list_product ) {
        this.products_name?.push(p.name != undefined ? p.name : "null");
      }
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  })
  this.api.getBasket(this.api.idUser? this.api.idUser : 0).subscribe((data: any) => {
    this.basket = data;
    console.log(this.basket);
  })
    
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
        found? this.api.addToBasket(this.api.idUser? this.api.idUser : 0, found.id? found.id : 0, quantity). subscribe((data : any) => {
          this.basket.push({
            "product" : found? found : new Product(),
            "quantity" : quantity
          })
        }): console.log("error");
    }
    });
  }

  deleteElement(element: Element) {
    this.api.removeFromBasket(this.api.idUser? this.api.idUser : 0 , element.product.id? element.product.id : 0  ).subscribe( ( data : any) => {
      this.basket = this.basket.filter(function(value, index, arr){ 
      return value.product.name != element.product.name;
    })

  })

 
  }

  deleteBasket() {
      this.api.resetBasket(this.api.idUser? this.api.idUser : 0 ).subscribe((data: any) => {
        this.api.getBasket(this.api.idUser? this.api.idUser : 0).subscribe((data: any) => {
          this.basket = data;
        })
      })
  }

  validateBasket() {
    this.api.buy(this.api.idUser? this.api.idUser : 0 ).subscribe((data: any) => {
      this.api.getBasket(this.api.idUser? this.api.idUser : 0).subscribe((data: any) => {
        this.basket = data;
      })
    })
  }
  modifyQuantity(idProduct: number | undefined, q_acc: number | undefined) {
    const dialogRef = this.dialog.open(DialogQuantityComponent, {
      width: '250px',
      data: {quantity: q_acc},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      let quantity = result;
      var found = this.list_product.find(function(product) {
        return product.id == idProduct;
      });
      if (Number.isInteger(quantity)) {
        found? this.api.editBasketQuantity(this.api.idUser? this.api.idUser : 0, found.id? found.id : 0, quantity). subscribe((data : any) => {
          this.api.getBasket(this.api.idUser? this.api.idUser : 0).subscribe((data: any) => {
            this.basket = data;
          })

        }): console.log("error");
    }
    });
  }
}
