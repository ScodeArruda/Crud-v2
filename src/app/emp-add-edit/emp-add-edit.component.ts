import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})

export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup
  education: string[] = [
    'Matricial',
    'Diploma',
    'Intermediário',
    'Graduado',
    'Pós Graduado'
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
    this.empForm = this._fb.group({
      firestName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  public onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Alterado com sucesso!!!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Adicionado com sucesso!!!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })

      }

    }
  }

}