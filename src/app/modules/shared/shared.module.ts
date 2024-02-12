import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedRoutingModule } from './shared-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { ResponsiveToolbarComponent } from './components/responsive-toolbar/responsive-toolbar.component';
import { ResponsiveSidenavComponent } from './components/responsive-sidenav/responsive-sidenav.component';
import { ConfirmationDialogComponent } from './components/Dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ResponsiveToolbarComponent,
    ResponsiveSidenavComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutModule,
    SharedRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  exports: [
    ResponsiveToolbarComponent,
    ResponsiveSidenavComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}
