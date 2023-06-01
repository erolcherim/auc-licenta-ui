import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isLoggedIn: boolean = false
  userEmail: string = "default"
  user?: User

  constructor(private service:LoginService, private userService:UserService, private router:Router){}

  ngOnInit(): void {
    this.isLoggedIn = this.service.isLoggedIn()
    if (this.isLoggedIn==true){
      this.userService.getUser(this.service.getIdFromToken()).subscribe(r => this.user = r)
    }
  }

  logOut(){
    this.service.logOut()
    this.router.navigate(["home"]).then(() => window.location.reload())
  }
}
