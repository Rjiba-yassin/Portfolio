import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-left">
        <button class="sidebar-toggle" (click)="toggleSidebar.emit()">
          <i class="fas" [class.fa-bars]="collapsed" [class.fa-times]="!collapsed"></i>
        </button>
        <h1 class="header-title">Employee Management System</h1>
      </div>
      
      <div class="header-right">
        <div class="header-actions">
          <div class="dropdown" [class.show]="userMenuOpen">
            <button class="user-menu" (click)="toggleUserMenu()">
              <span class="user-name">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
              <span class="user-avatar">
                <i class="fas fa-user"></i>
              </span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" [class.show]="userMenuOpen">
              <a class="dropdown-item" href="javascript:void(0)">
                <i class="fas fa-user"></i> Profile
              </a>
              <a class="dropdown-item" href="javascript:void(0)">
                <i class="fas fa-cog"></i> Settings
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0)" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .header-left {
      display: flex;
      align-items: center;
    }
    
    .sidebar-toggle {
      background: transparent;
      color: white;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      border-radius: 0.25rem;
    }
    
    .sidebar-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .header-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
    
    .header-right {
      display: flex;
      align-items: center;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
    }
    
    .dropdown {
      position: relative;
    }
    
    .user-menu {
      background: transparent;
      color: white;
      border: none;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;
      transition: var(--transition);
      border-radius: 0.25rem;
    }
    
    .user-menu:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .user-name {
      margin-right: 0.5rem;
      font-weight: 500;
    }
    
    .user-avatar {
      width: 2rem;
      height: 2rem;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 10rem;
      background-color: white;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
      padding: 0.5rem 0;
      display: none;
      z-index: 1000;
      margin-top: 0.5rem;
    }
    
    .dropdown-menu.show {
      display: block;
      animation: fadeIn 0.2s;
    }
    
    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      color: #212529;
      text-decoration: none;
      transition: var(--transition);
    }
    
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
    
    .dropdown-item i {
      margin-right: 0.5rem;
      width: 1.25rem;
      text-align: center;
    }
    
    .dropdown-divider {
      border-top: 1px solid #e9ecef;
      margin: 0.5rem 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .header-title {
        display: none;
      }
      
      .user-name {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  userMenuOpen = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}