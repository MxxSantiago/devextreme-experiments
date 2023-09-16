import { Component, ViewChild } from '@angular/core';
import {
  DxDataGridComponent,
  DxFormComponent,
  DxPopupComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
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
  selectedRows: number[] = [];

  defaultPerson = Person.create('Kevin', 30, 'BLG', '111-666-7777');
  currentPerson: Person | null = null;

  namePattern = /^[^0-9]+$/;
  phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

  @ViewChild('modal', { static: false }) modal!: DxPopupComponent;
  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  @ViewChild(DxValidationGroupComponent, { static: false })
  validationGroup!: DxValidationGroupComponent;
  submitButtonOptions: any;
  Object = Object;
  isFormValid: boolean = false;

  isModalVisible: boolean = false;
  formData: any = Person.default();

  editableFields: { [key: string]: boolean } = {
    name: true,
    age: true,
    nationality: true,
    phoneNumber: true,
  };

  toggleEditableField(fieldName: string) {
    this.editableFields[fieldName] = !this.editableFields[fieldName];
  }

  showModal() {
    this.isModalVisible = true;
  }

  onModalHidden() {
    this.isModalVisible = false;
  }

  cancelChanges() {
    this.isModalVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {};
    this.form.instance.resetValues();
    this.isFormValid = false;
  }

  constructor(private readonly service: PersonService) {
    service.get().subscribe((data) => (this.persons = data));

    var that = this;

    this.submitButtonOptions = {
      text: 'Submit',
      onClick(e: any) {
        // if the propertie is not editable, then it will be sended with a null value
        const submitData = Object.keys(that.editableFields).reduce(
          (acc: any, key) => {
            if (that.editableFields[key]) {
              acc[key] = that.formData[key];
            }
            return acc;
          },
          {}
        );

        const data = {
          keys: that.selectedRows,
          formValues: submitData,
        };
        console.log(data);
        that.dataGrid.instance.clearSelection();
        that.isModalVisible = false;
        that.form.instance.resetValues();
      },
    };
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

  selectionChangedHandler() {
    console.log(this.selectedRows);
  }
}
