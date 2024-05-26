import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogData, GoalDetailComponent } from '../goal-detail/goal-detail.component';

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
  ]
 
})
export class EditDialogComponent {

  newName?: string = "";
  newDescr?: string = "";

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm): void{
    if (form.value.name != ""){
      this.newName = form.value.name;
    }    
    if (form.value.description != ""){
      this.newDescr = form.value.description;
    }    
    console.log("hey - editForm Submitted- ", this.newName, ":", this.newDescr);

    this.dialogRef.close({confirmed:true, data:{name:this.newName, description: this.newDescr}});
    
  }

  

  setData(){
    this.newName = this.data.name;
    this.newDescr = this.data.description;
    console.log(this.newName,": ", this.newDescr);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.setData();
    
  }

  }


