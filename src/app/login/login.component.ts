import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthGuard } from '../services/auth-guard';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user = new FormControl('');
  password = new FormControl('');
  loginForm: FormGroup;

  constructor(private authService: AuthService,private router: Router ) {
    this.loginForm = new FormGroup({
      user: this.user,
      password: this.password
    });
  }

  ngOnInit(): void {
    console.log('Entra en el ngOnInit');
  }

  login(){
    var exit;
    if(this.user.value == 'App' && this.password.value == '1460@'){
      this.authService.login();
      this.router.navigate(['/form']);
    }else{
      this.authService.logout();
    }
    
  }

}
