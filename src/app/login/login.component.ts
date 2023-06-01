import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide:boolean = true
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])

  constructor(private service:LoginService, private router:Router, private _snackBar:MatSnackBar){}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  attemptLogin(){
    var user = {
      email: this.email.value,
      password: this.password.value
    }

    this.service.proceedLogin(user).subscribe(r => {
      if (r !=null) {
      localStorage.setItem('token', r.token); 
      this.router.navigate(['home']).then(()=>window.location.reload())
      }
    }, err => {
        this._snackBar.open(err.error.response,"Dismiss", {
          duration:2000,
        })
      }
    )
  }

}


