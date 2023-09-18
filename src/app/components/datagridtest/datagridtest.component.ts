import { Component, ViewChild } from '@angular/core';
import {
  DxDataGridComponent,
  DxFormComponent,
  DxPopupComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { User, nationalities } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-datagridtest',
  templateUrl: './datagridtest.component.html',
  styleUrls: ['./datagridtest.component.scss'],
})
export class DatagridtestComponent {
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;

  persons: User[] = [];
  selectedRows: number[] = [];

  defaultPerson = User.create('Kevin', 30, 'BLG', '111-666-7777');
  currentPerson: User | null = null;

  namePattern = /^[^0-9]+$/;
  phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

  nationalities: nationalities[] = ['USA', 'MX', 'BLG'];

  @ViewChild('modal', { static: false }) modal!: DxPopupComponent;
  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  @ViewChild(DxValidationGroupComponent, { static: false })
  validationGroup!: DxValidationGroupComponent;
  submitButtonOptions: any;
  isFormValid: boolean = true;
  isModalVisible: boolean = false;
  formData: any = User.default();

  editableFields: { [key: string]: boolean } = {
    name: true,
    age: true,
    nationality: true,
    phoneNumber: true,
  };

  toggleEditableField(e: any, fieldName: string) {
    if (e.event === undefined) return;
    this.editableFields[fieldName] = !this.editableFields[fieldName];
    this.validateForm();
  }

  validateForm() {
    const isOneEditableChecked = Object.values(this.editableFields).some(
      (value) => value
    );

    this.isFormValid = isOneEditableChecked;

    return this.isFormValid;
  }

  toggleAllEditableFields(e: any) {
    if (e.event === undefined) return;
    for (const fieldName in this.editableFields) {
      if (this.editableFields.hasOwnProperty(fieldName)) {
        this.editableFields[fieldName] = e.value;
      }
    }
    this.validateForm();
  }

  isAllEditableChecked() {
    for (const fieldName in this.editableFields) {
      if (
        this.editableFields.hasOwnProperty(fieldName) &&
        !this.editableFields[fieldName]
      ) {
        return false;
      }
    }
    return true;
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

  loadUsers() {
    this.service.get().subscribe((data) => (this.persons = data));
  }

  constructor(private readonly service: PersonService) {
    this.loadUsers();

    var that = this;

    this.submitButtonOptions = {
      text: 'Submit',
      onClick(e: any) {
        if (!that.validateForm()) return;
        // if the property is not editable, then it will be sended with a null value
        const submitData: any = {};
        for (const key of Object.keys(that.editableFields)) {
          submitData[key] = that.formData[key];
        }

        const data = {
          keys: that.selectedRows,
          formValues: submitData,
        };

        that.service.massUpdate(data.formValues, data.keys).subscribe({
          next() {
            that.loadUsers();
          },
          error() {
            e.cancel();
          },
        });

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
      error(error) {
        console.log(error);
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
