import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.content }}
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Hayır</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Evet</button>
    </div>
  `,
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
