import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {


empForm: FormGroup;

education: string[] = [
  'Matric',
  ' Intermediate',
  'Diploma',
  'Graduate',
  'Post Graduate',
];

constructor(private _fb: FormBuilder, 
            private _empService: EmployeeService , 
            private _dialogRef: MatDialogRef<EmpAddEditComponent>,
          @Inject(MAT_DIALOG_DATA) public data:any ) {
  this.empForm = this._fb.group({  
    firstName: this._fb.control('',Validators.required),
    lastName: this._fb.control('',Validators.required),
    email: this._fb.control('',Validators.required),
    password: this._fb.control('',Validators.required),
    dob: this._fb.control('',Validators.required),
    education: this._fb.control('',Validators.required),
    gender: this._fb.control('',Validators.required),
    company: this._fb.control('',Validators.required),
    experience: this._fb.control('',Validators.required),
    salary: this._fb.control('',Validators.required),
    address: this._fb.control('',Validators.required),
   });
}
ngOnInit(): void {
  this.empForm.patchValue(this.data);
}
onFormSubmit() {
  if(this.empForm.valid) {
    if(this.data){
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next: (val:any) => {
          alert('Employee Updated Sucessfully');
          this._dialogRef.close(true);
        },
        error: (err: any)=> {
          console.error(err); 
        }
      })
    }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) => {
          alert('Employee  Sucessfully');
          this._dialogRef.close(true);
        },
        error: (err: any)=> {
          console.error(err); 
        }
      })

    }
   
  }
}

}
