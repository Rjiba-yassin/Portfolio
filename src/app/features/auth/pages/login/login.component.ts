import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-content">
        <div class="login-header">
          <h1 class="app-title">Employee Management System</h1>
        </div>
        
        <div class="card login-card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">Login</h2>
            
            <div class="alert alert-danger" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email" 
                  class="form-control" 
                  [class.is-invalid]="submitted && f.email.errors"
                  autocomplete="email"
                />
                <div class="invalid-feedback" *ngIf="submitted && f.email.errors">
                  <div *ngIf="f.email.errors.required">Email is required</div>
                  <div *ngIf="f.email.errors.email">Enter a valid email address</div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  formControlName="password" 
                  class="form-control" 
                  [class.is-invalid]="submitted && f.password.errors"
                  autocomplete="current-password"
                />
                <div class="invalid-feedback" *ngIf="submitted && f.password.errors">
                  <div *ngIf="f.password.errors.required">Password is required</div>
                </div>
              </div>
              
              <div class="form-group d-flex justify-content-between align-items-center">
                <div class="form-check">
                  <input type="checkbox" id="remember" class="form-check-input" formControlName="remember">
                  <label for="remember" class="form-check-label">Remember me</label>
                </div>
                <a href="javascript:void(0)" class="forgot-password">Forgot password?</a>
              </div>
              
              <div class="form-group mt-4">
                <button 
                  type="submit" 
                  class="btn btn-primary w-100" 
                  [disabled]="loading"
                >
                  <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
                  Login
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <p class="demo-creds">
                Demo credentials: <strong>admin@example.com / admin123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background-color: var(--primary);
      background-image: linear-gradient(135deg, var(--primary), var(--primary-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }
    
    .login-content {
      width: 100%;
      max-width: 400px;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .app-title {
      color: white;
      font-size: 2rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .login-card {
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    
    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: var(--danger);
    }
    
    .form-check-input {
      margin-right: 0.5rem;
    }
    
    .forgot-password {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.875rem;
    }
    
    .forgot-password:hover {
      text-decoration: underline;
    }
    
    .alert {
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      border-radius: 0.25rem;
    }
    
    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    
    .demo-creds {
      font-size: 0.875rem;
      color: #6c757d;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['admin123', Validators.required],
      remember: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.loading = false;
        }
      });
  }
}