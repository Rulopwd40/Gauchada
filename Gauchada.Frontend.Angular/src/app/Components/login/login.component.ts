import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-login',
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
    loginForm= new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
      }
    );

  constructor(private router:Router){};
  show= false;
  login(){

    }
  register(){
    this.router.navigate(['register']);
    }
  showPassword(){
    this.show=!this.show;
  }
}
