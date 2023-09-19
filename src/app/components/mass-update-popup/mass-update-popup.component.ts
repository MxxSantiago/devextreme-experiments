import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DxFormComponent,
  DxPopupComponent,
  DxValidationGroupComponent,
} from 'devextreme-angular';
import { User, nationalities } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-mass-update-popup',
  templateUrl: './mass-update-popup.component.html',
  styleUrls: ['./mass-update-popup.component.scss'],
})
export class MassUpdatePopupComponent {
  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;
  @ViewChild('popup', { static: false }) popup!: DxPopupComponent;

  @Input() selectedRows: number[] = [];
  @Output() massUpdateSubmittedEvent = new EventEmitter<any>();

  submitButtonOptions: any;
  validationGroup!: DxValidationGroupComponent;
  isFormValid: boolean = true;

  formData: any = User.default();
  nationalities: nationalities[] = ['USA', 'MX', 'BLG'];

  editableFields: { [key: string]: boolean } = {
    name: true,
    age: true,
    nationality: true,
    phoneNumber: true,
  };

  constructor(private readonly service: PersonService) {
    var that = this;

    this.submitButtonOptions = {
      text: 'Submit',
      onClick(e: any) {
        if (!that.validateForm()) return;

        const submitData: any = {};
        for (const key of Object.keys(that.editableFields)) {
          submitData[key] = that.formData[key];
        }

        that.service.massUpdate(submitData, that.selectedRows).subscribe({
          next() {
            that.massUpdateSubmittedEvent.emit();
            that.popup.instance.hide();
          },
          error() {
            e.cancel();
          },
        });

        that.form.instance.resetValues();
      },
    };
  }

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

  resetForm() {
    this.formData = {};
    this.form.instance.resetValues();
    this.isFormValid = false;
  }
}
