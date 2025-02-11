import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListingService } from '../services/listing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent {
  form = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.minLength(5)]),
    startingPrice : new FormControl('', [Validators.required, Validators.pattern("^(?:[1-9][0-9]{0,5})$")]),
    description : new FormControl('', [Validators.maxLength(1000)]),
  })

  selectedFile:any;
  imageSrc:any;

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

  constructor(private service:ListingService, private router:Router, private _snackBar:MatSnackBar){ }

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

      this.service.postListing(formData).subscribe({
        next:(r)=>{this.router.navigate(['home']).then(() => window.location.reload())}, //TODO get id and route there
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
