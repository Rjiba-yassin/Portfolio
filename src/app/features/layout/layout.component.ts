import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-container">
      <app-sidebar [collapsed]="sidebarCollapsed"></app-sidebar>
      
      <div class="main-content">
        <app-header 
          [collapsed]="sidebarCollapsed" 
          (toggleSidebar)="toggleSidebar()"
        ></app-header>
        
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    
    .content-area {
      padding: 1.5rem;
      flex: 1;
      overflow-y: auto;
      background-color: #f8f9fa;
    }
    
    @media (max-width: 768px) {
      .content-area {
        padding: 1rem;
      }
    }
  `]
})
export class LayoutComponent {
  sidebarCollapsed = false;

  constructor(private authService: AuthService) {}

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}