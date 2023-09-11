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
  DxDataGridModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DatagridtestComponent } from './components/datagridtest/datagridtest.component';
import { PersonTasksComponent } from './components/person-tasks/person-tasks.component';

@NgModule({
  declarations: [AppComponent, DatagridtestComponent, PersonTasksComponent],
  imports: [
    BrowserModule,
    DxDataGridModule,
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
