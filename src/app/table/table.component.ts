import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IProduct } from './table.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input()
  tableData: IProduct[];
  tableForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    if (this.tableData) {
      this.initializeForm();
    }
  }

  ngOnInit() {}

  initializeForm() {
    this.tableForm = this.formBuilder.group({
      quantities: this.formBuilder.array([]),
    });
    this.tableData.forEach((item, index) => {
      this.addFormGroup();
    });
  }

  addFormGroup() {
    const formGroup = this.formBuilder.group({
      quantity: new FormControl(''),
      inputs: this.formBuilder.array([]),
    });
    const formArray = this.tableForm.get('quantities') as FormArray;
    formArray.push(formGroup);
  }

  onQuantityChange(index: number) {
    const quantity = this.getQuantityControl(index).value;
    const inputsArray = this.getInputsArray(index);
    const currentControlCount = inputsArray.length;
    if (quantity > currentControlCount) {
      for (let i = currentControlCount; i < quantity; i++) {
        inputsArray.push(new FormControl(''));
      }
    } else if (quantity < currentControlCount) {
      for (let i = currentControlCount - 1; i >= quantity; i--) {
        inputsArray.removeAt(i);
      }
    }
  }

  get quantities(): FormArray {
    return this.tableForm.get('quantities') as FormArray;
  }

  getFormGroup(index: number): FormGroup {
    const quantitiesArray = this.tableForm.get('quantities') as FormArray;
    return quantitiesArray.at(index) as FormGroup;
  }

  getInputsArray(index: number): FormArray {
    const formGroup = this.getFormGroup(index);
    return formGroup.get('inputs') as FormArray;
  }

  getInputsControl(index: number, controlIndex: number): FormControl {
    const inputsArray = this.getInputsArray(index);
    return inputsArray.at(controlIndex) as FormControl;
  }

  getQuantityControl(index: number) {
    const group = this.getFormGroup(index);
    return group.get('quantity') as FormControl;
  }

  submit(){
    console.log(this.tableForm.value);
  }
}
