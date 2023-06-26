import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Listing } from 'src/app/model/listing';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit{
  form = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.minLength(5)]),
    startingPrice : new FormControl('', [Validators.required, Validators.pattern("^(?:[1-9][0-9]{0,5})$")]),
    description : new FormControl('', [Validators.maxLength(1000)]),
  })

  selectedFile:any;
  imageSrc:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private listingService:ListingService, private _snackBar:MatSnackBar, private router:Router){}

  ngOnInit(): void {
    this.imageSrc=this.data.imageSrc;
    this.selectedFile = "dummy value";
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.selectedFile);
  }

  clearFileSelected(): void{
    this.imageSrc=null;
    this.selectedFile=null;
  }

  getErrorName(){
    if (this.form.controls['name'].hasError('required')){
      return 'You must enter a value';
    }
    return this.form.controls['name'].hasError('minlength') ? 'Name must be at least 5 characters' : '';
  }

  getErrorStartingPrice(){
    if (this.form.controls['startingPrice'].hasError('required')){
      return 'You must enter a value';
    }
    return this.form.controls['startingPrice'].hasError('pattern') ? 'Price must an integer (no decimals) and at least 1' : '';
  }

  getErrorDescription(){
    if (this.form.controls['description'].hasError('maxlength')){
      return "Description must not exceed 1000 characters"
    }
    else return ''
  }

  proceedAddListing(){
    if (this.form.valid){
      var listing = {
        name:this.form.value.name,
        startingPrice:this.form.value.startingPrice,
        description: this.form.value.description
      }

      var formData = new FormData();
      formData.set("model",JSON.stringify(listing));
      formData.set("file", this.selectedFile);

      this.listingService.editListing(formData, this.data.id).subscribe({
        next:(r)=>{window.location.reload()}, //TODO get id and route there
        error:(e)=>(this._snackBar.open(e.error.response, "Dismiss", {
          duration: 2000
        }))
        }
      )
    }
    else{
      this._snackBar.open("Error, check all fields and try again", "Dismiss", {
        duration:2000
      })
    }
  }
}
