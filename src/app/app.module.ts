import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonService } from './services/person.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxBulletModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidationSummaryModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DatagridtestComponent } from './components/datagridtest/datagridtest.component';
import { PersonTasksComponent } from './components/person-tasks/person-tasks.component';
import {
  DxoFormItemModule,
  DxoNotificationsModule,
} from 'devextreme-angular/ui/nested';
import { MassUpdatePopupComponent } from './components/mass-update-popup/mass-update-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    DatagridtestComponent,
    PersonTasksComponent,
    MassUpdatePopupComponent,
  ],
  imports: [
    BrowserModule,
    DxPopupModule,
    DxFormModule,
    DxValidationSummaryModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxCheckBoxModule,
    DxoFormItemModule,
    DxDataGridModule,
    DxoNotificationsModule,
    DxBulletModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxToolbarModule,
    DxSelectBoxModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [PersonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
