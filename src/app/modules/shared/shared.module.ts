import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResponsiveToolbarComponent } from './components/responsive-toolbar/responsive-toolbar.component';
import { ResponsiveSidenavComponent } from './components/responsive-sidenav/responsive-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedRoutingModule } from './shared-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ResponsiveToolbarComponent, ResponsiveSidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    LayoutModule,
    SharedRoutingModule,
    MatExpansionModule,
  ],
  exports: [ResponsiveToolbarComponent, ResponsiveSidenavComponent],
})
export class SharedModule {}
