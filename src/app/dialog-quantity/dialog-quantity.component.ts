import { Inject, Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-quantity',
  templateUrl: './dialog-quantity.component.html',
  styleUrls: ['./dialog-quantity.component.css']
})
export class DialogQuantityComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
