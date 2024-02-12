import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          this.toastrService.success(response.message);
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.toastrService.error(err.error);
        },
      });
    }
  }
}
