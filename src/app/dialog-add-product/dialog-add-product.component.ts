import { Inject, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-product',
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.css']
})
export class DialogAddProductComponent implements OnInit {

  addForm = new FormGroup({
    Name : new FormControl(this.data?.name? this.data.name : '' ),
    Price : new FormControl(this.data?.price? this.data.price : ''),
    Quantity: new FormControl(this.data?.quantity? this.data.quantity : '')
  });

  quantity = this.data.quantity;
  price = this.data.price;

  constructor( public dialogRef: MatDialogRef<DialogAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public api: ApiService) { }

  ngOnInit(): void {
    
  }

  Submit(){
    if (this.addForm.invalid) {
      return;
    } else {
      if ( this.data.name != undefined) {
        console.log(this.data.quantity);
        console.log( this.addForm.value.Quantity);
        if (this.data.quantity != this.addForm.value.Quantity) {
          this.api.updateStock(this.api.idUser? this.api.idUser : 0, this.data.id,  this.addForm.value.Quantity).subscribe((data: any) => {

          });
        }
        if (this.data.price != this.addForm.value.Price) {
          this.api.updatePrice(this.api.idUser? this.api.idUser : 0, this.data.id,  this.addForm.value.Price).subscribe((data: any) => {
            
          });
        }
        this.dialogRef.close();
      } else {
              this.api.addProduct(this.api.idUser? this.api.idUser : 0, this.addForm.value.Name,Number(this.addForm.value.Price), Number(this.addForm.value.Quantity )).subscribe( (data: any) => {
          this.dialogRef.close();
      })
      }

    }
  }
}
