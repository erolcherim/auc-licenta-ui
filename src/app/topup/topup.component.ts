import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent {
  topUpAmount = new FormControl('', [Validators.required, Validators.min(5)])
  paymentMethod = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("(?:\\d[ -]*?){13,16}")])

  constructor(private userService:UserService, private service:LoginService) {}

  getErrorMessageTopUp() {
    if (this.topUpAmount.hasError('min')) {
      return 'Minimum top up amount is 5';
    }
    else return this.topUpAmount.hasError('pattern') ? 'Not a valid topup amount' : '';
  }

  getErrorMessagePaymentMethod() {
    if (this.paymentMethod.hasError('minlength') || this.paymentMethod.hasError('maxlength')) {
      return 'Credit card invalid length';
    }
    else return this.topUpAmount.hasError('pattern') ? '' : 'Credit card pattern is invalid'; 
  }

  proceedTopUp(){
    this.userService.topUp(this.service.getIdFromToken(), Number(this.topUpAmount.value)).subscribe()
  }
}
