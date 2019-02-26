import { NgModule } from '@angular/core';
import {
          MatToolbarModule,
          MatDialogModule,
          MatButtonModule,
          MatCardModule,
          MatProgressSpinnerModule,
          MatFormFieldModule,
          MatInputModule,
          MatRadioModule,
          MatSelectModule,
          MatIconModule,
          MatSidenavModule,
          MatDividerModule,
          MatTabsModule,
          MatTableModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
  ]
})
export class MaterialModule { }
