import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogData, GoalDetailComponent } from '../goal-detail/goal-detail.component';
import {NgIf} from '@angular/common';

export interface EditsData {
  newName?: string;
  newDescr?: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf
  ]
 
})
export class EditDialogComponent {

  name?: string;
  description?: string;

  invalidName = new FormControl('', [Validators.required]);
  invalidDescription = new FormControl('', [Validators.required]);



  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    //console.log(this.data);
    this.setData();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.name == null || this.name == '') {
      this.setData();
    } else if (this.description == null || this.description == '') {
      this.setData();
    };

    //console.log("hey - editForm Submitted- ", this.newName, ":", this.newDescr);
    this.dialogRef.close({confirmed:true, data:{name:this.name, description: this.description}});
  }

  //Checks for validity of name in real time providing feedback to the user
  nameValidityCheck() {
    return this.invalidName.hasError('required') ? 'Name is required' : '';
  }

  descriptionValidityCheck() {
    return this.invalidDescription.hasError('required') ? 'Description is required' : '';
  }

  setData(){
    this.name = this.data.name;
    this.description = this.data.description;
    //console.log(this.newName,": ", this.newDescr);
  }
}