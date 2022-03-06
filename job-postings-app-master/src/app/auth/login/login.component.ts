import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  get form() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required,  Validators.email],
      password: ['', Validators.required]
    });
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.form['mail'].value,
      this.form['password'].value)
      .subscribe({
      next: (response) => {
        if (response) {
          this.authService.storeUserData(response);
          this.router.navigate(['/']);
        }
      }    
    });
  }
}