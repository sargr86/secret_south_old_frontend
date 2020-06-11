import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  dialogMessage = 'Please confirm this action';
  yes = 'Confirm';
  no = 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.dialogMessage = data.text1;
      this.yes = data.yes;
      this.no = data.no;
    }
  }

  ngOnInit() {
  }

  /**
   * Confirms selected action
   */
  confirm() {
    this.dialogRef.close(true);
  }

  /**
   * Cancels selected action
   */
  cancel() {
    this.dialogRef.close(false);
  }


}
