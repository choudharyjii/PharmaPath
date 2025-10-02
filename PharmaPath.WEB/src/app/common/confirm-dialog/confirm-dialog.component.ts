import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class ConfirmDialogComponent {

  message: string = '';
  btnShow : boolean = true;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) {}
    clickYesButton(){
      this.dialogRef.close(true);
    }
    clickNoButton(){
      this.dialogRef.close(false);
    }
}
