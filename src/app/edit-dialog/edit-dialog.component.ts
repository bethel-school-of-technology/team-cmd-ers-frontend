import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
 
})
export class EditDialogComponent {
 
  newDescr: string = "";

  constructor() {}

  onSubmit(form: NgForm){
    this.newDescr = form.value.description;
    console.log("hey - editForm Submitted:", this.newDescr);
    this.confirmed();
  }

  confirmed(){
    alert("Description editted, you may now close.");

  }

  ngOnInit(): void {

    
  }

  }


