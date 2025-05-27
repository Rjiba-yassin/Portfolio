import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar" [class.sidebar-collapsed]="collapsed">
      <div class="logo-container">
        <a [routerLink]="['/dashboard']" class="logo">
          <span class="logo-icon"><i class="fas fa-users-cog"></i></span>
          <span class="logo-text" [class.d-none]="collapsed">EMS</span>
        </a>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li *ngFor="let item of navItems">
            <a 
              [routerLink]="[item.route]" 
              routerLinkActive="active"
              class="nav-link"
            >
              <span class="nav-icon"><i [class]="item.icon"></i></span>
              <span class="nav-label" [class.d-none]="collapsed">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background-color: var(--dark);
      color: white;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      z-index: 1000;
    }
    
    .sidebar-collapsed {
      width: 70px;
    }
    
    .logo-container {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      transition: var(--transition);
    }
    
    .logo:hover {
      opacity: 0.9;
    }
    
    .logo-icon {
      font-size: 1.5rem;
      margin-right: 0.75rem;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
      overflow-y: auto;
    }
    
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: var(--transition);
      border-left: 3px solid transparent;
    }
    
    .nav-link:hover, .nav-link.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      border-left-color: var(--primary);
    }
    
    .nav-icon {
      font-size: 1.25rem;
      width: 1.5rem;
      text-align: center;
      margin-right: 1rem;
    }
    
    .d-none {
      display: none;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        transform: translateX(-100%);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      }
      
      .sidebar:not(.sidebar-collapsed) {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent {
  @Input() collapsed = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/dashboard' },
    { label: 'Employees', icon: 'fas fa-users', route: '/employees' },
    { label: 'Departments', icon: 'fas fa-sitemap', route: '/departments' },
    { label: 'Leaves', icon: 'fas fa-calendar-alt', route: '/leaves' },
    { label: 'Salary', icon: 'fas fa-money-bill-alt', route: '/salary' },
    { label: 'Settings', icon: 'fas fa-cog', route: '/settings' }
  ];
}