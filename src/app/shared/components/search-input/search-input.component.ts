import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input 
        type="text" 
        class="search-input" 
        [placeholder]="placeholder" 
        [(ngModel)]="searchText"
        (input)="onSearch()"
      >
      <button 
        *ngIf="searchText" 
        class="clear-button" 
        (click)="clearSearch()"
        aria-label="Clear search"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    
    .search-input {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 2rem;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }
    
    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(18, 165, 148, 0.2);
    }
    
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #888;
    }
    
    .clear-button {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 50%;
    }
    
    .clear-button:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `]
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();
  
  searchText: string = '';

  onSearch(): void {
    this.search.emit(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.search.emit('');
  }
}