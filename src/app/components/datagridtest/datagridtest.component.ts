import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-datagridtest',
  templateUrl: './datagridtest.component.html',
  styleUrls: ['./datagridtest.component.scss'],
})
export class DatagridtestComponent {
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;

  persons: Person[] = [];

  defaultPerson = Person.create('Kevin', 30, 'BLG', '111-666-7777');
  currentPerson: Person | null = null;

  namePattern = /^[^0-9]+$/;
  phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

  constructor(private readonly service: PersonService) {
    service.get().subscribe((data) => (this.persons = data));
  }

  onFocusedRowChanged(e: any) {
    let rowData = e.row?.data;

    if (rowData) {
      this.currentPerson = {
        ...rowData,
      };
    }
  }

  onInitNewRow(e: any) {
    e.data = this.defaultPerson;
  }

  onRowInserting(e: any) {
    this.service.create(e.data).subscribe({
      next() {
        console.log('Creating person..');
      },
      error() {
        e.cancel();
      },
    });
  }

  onRowInserted() {
    console.log('Person created!!');
  }

  onRowRemoving(e: any) {
    this.service.delete(e.data?.id).subscribe({
      next() {
        console.log('Deleting person..');
      },
      error() {
        e.cancel();
      },
    });
  }

  onRowRemoved() {
    console.log('Person deleted!!');
  }

  onRowUpdating(e: any) {
    this.service
      .update(e.key, {
        ...e.oldData,
        name: e.newData.name,
      })
      .subscribe({
        next() {
          console.log('Updating person..');
        },
        error() {
          e.cancel();
        },
      });
  }

  onRowUpdated() {
    console.log('Person updated!!');
  }
}
