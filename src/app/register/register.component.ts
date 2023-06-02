import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide:boolean = true
  firstName = new FormControl('', [Validators.required, Validators.pattern("^\\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+")])
  lastName = new FormControl('', [Validators.required, Validators.pattern("^\\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+")])
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")])
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")])

  constructor(private service:LoginService, private router:Router, private _snackBar:MatSnackBar){}

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageName(object:FormControl) {
    if (object.hasError('required')) {
      return 'You must enter a value';
    }
    return object.hasError('pattern') ? 'Name must begin with a capital letter and not contain numbers' : '';
  }

  getErrorMessagePassword(object:FormControl) {
    if (object.hasError('required')) {
      return 'You must enter a value';
    }
    return object.hasError('pattern') ? 'Password is not valid' : '';
  }


  formValid(){
    return this.password.value == this.confirmPassword.value && this.email.valid && this.firstName.valid && this.lastName.valid;
  }

  attemptRegister(){
    if (this.formValid()){
      var userRegister = {
        firstName:this.firstName.value,
        lastName:this.lastName.value,
        email:this.email.value,
        password:this.password.value,
        confirmPassword:this.confirmPassword.value
      }

      this.service.proceedRegister(userRegister).subscribe({
        next: (r) => {
          localStorage.setItem('token', r.token)
          this.router.navigate(['home']).then(()=>window.location.reload())
        },
        error: (e) => {
          this._snackBar.open(e.error.response, "Dismiss", {
            duration:2000
          })
        }
      })
    }
    else{
      this._snackBar.open("Error, check all fields and try again", "Dismiss", {
        duration:2000
      })
    }
  }
}
