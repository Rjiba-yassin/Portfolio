import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../search-input/search-input.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'date' | 'number' | 'currency' | 'status';
  formatter?: (value: any, row: any) => string;
  width?: string;
}

export interface TableAction {
  label: string;
  icon: string;
  color?: string;
  click: (item: any) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, SearchInputComponent],
  template: `
    <div class="data-table-wrapper">
      <div class="data-table-header">
        <div class="data-table-search" *ngIf="showSearch">
          <app-search-input 
            [placeholder]="searchPlaceholder" 
            (search)="onSearch($event)"
          ></app-search-input>
        </div>
        <div class="data-table-actions">
          <ng-content select="[tableActions]"></ng-content>
        </div>
      </div>
      
      <div class="data-table-container">
        <table class="table">
          <thead>
            <tr>
              <ng-container *ngFor="let column of columns">
                <th 
                  [style.width]="column.width || 'auto'"
                  [class.sortable]="column.sortable"
                  (click)="column.sortable ? onSort(column.key) : null"
                >
                  {{ column.label }}
                  <i 
                    *ngIf="column.sortable" 
                    class="fas"
                    [class.fa-sort]="sortColumn !== column.key"
                    [class.fa-sort-up]="sortColumn === column.key && sortDirection === 'asc'"
                    [class.fa-sort-down]="sortColumn === column.key && sortDirection === 'desc'"
                  ></i>
                </th>
              </ng-container>
              <th *ngIf="actions.length > 0" style="width: 150px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of filteredItems" [class.selected]="selected && item === selected">
              <ng-container *ngFor="let column of columns">
                <td 
                  [attr.data-label]="column.label"
                  [class]="column.type || ''"
                >
                  <ng-container *ngIf="column.formatter; else defaultValue">
                    {{ column.formatter(item[column.key], item) }}
                  </ng-container>
                  <ng-template #defaultValue>
                    <ng-container [ngSwitch]="column.type">
                      <span *ngSwitchCase="'currency'">{{ item[column.key] | currency }}</span>
                      <span *ngSwitchCase="'date'">{{ item[column.key] | date }}</span>
                      <span *ngSwitchCase="'status'" class="status-badge" [attr.data-status]="item[column.key]">
                        {{ item[column.key] }}
                      </span>
                      <span *ngSwitchDefault>{{ item[column.key] }}</span>
                    </ng-container>
                  </ng-template>
                </td>
              </ng-container>
              <td *ngIf="actions.length > 0" class="action-cell">
                <div class="action-buttons">
                  <button 
                    *ngFor="let action of actions" 
                    class="btn btn-sm" 
                    [ngClass]="action.color || 'btn-secondary'"
                    (click)="action.click(item)"
                    [attr.aria-label]="action.label"
                  >
                    <i [class]="action.icon"></i>
                    <span class="action-label">{{ action.label }}</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="filteredItems.length === 0">
              <td [attr.colspan]="columns.length + (actions.length > 0 ? 1 : 0)" class="empty-message">
                {{ emptyMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="data-table-footer" *ngIf="showPagination && totalItems > 0">
        <div class="pagination-info">
          Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} items
        </div>
        <div class="pagination-controls">
          <button 
            class="page-btn" 
            [disabled]="currentPage === 1"
            (click)="onPageChange(1)"
            aria-label="First page"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button 
            class="page-btn" 
            [disabled]="currentPage === 1"
            (click)="onPageChange(currentPage - 1)"
            aria-label="Previous page"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          
          <div class="page-number-info">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
          
          <button 
            class="page-btn" 
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(currentPage + 1)"
            aria-label="Next page"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <button 
            class="page-btn" 
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(totalPages)"
            aria-label="Last page"
          >
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .data-table-wrapper {
      width: 100%;
    }
    
    .data-table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .data-table-search {
      width: 300px;
    }
    
    .data-table-container {
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .table th {
      font-weight: 600;
      text-align: left;
      padding: 0.75rem;
      background-color: #f8f9fa;
      border-bottom: 2px solid #dee2e6;
    }
    
    .table td {
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;
      vertical-align: middle;
    }
    
    .table tbody tr:hover {
      background-color: rgba(18, 165, 148, 0.05);
    }
    
    .table tr.selected {
      background-color: rgba(18, 165, 148, 0.1);
    }
    
    th.sortable {
      cursor: pointer;
    }
    
    th.sortable:hover {
      background-color: #e9ecef;
    }
    
    .empty-message {
      text-align: center;
      padding: 2rem !important;
      color: #6c757d;
    }
    
    .action-cell {
      white-space: nowrap;
    }
    
    .action-buttons {
      display: flex;
      gap: 0.25rem;
    }
    
    .action-buttons .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    
    .action-label {
      display: none;
      margin-left: 0.25rem;
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
    }
    
    .status-badge[data-status="active"], 
    .status-badge[data-status="approved"] {
      background-color: rgba(40, 167, 69, 0.2);
      color: #28a745;
    }
    
    .status-badge[data-status="inactive"], 
    .status-badge[data-status="rejected"] {
      background-color: rgba(220, 53, 69, 0.2);
      color: #dc3545;
    }
    
    .status-badge[data-status="pending"] {
      background-color: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }
    
    .data-table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .page-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      border: 1px solid #dee2e6;
      background-color: #fff;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .page-btn:hover:not(:disabled) {
      background-color: #e9ecef;
    }
    
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .page-number-info {
      margin: 0 0.5rem;
    }
    
    .pagination-info {
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .data-table-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .data-table-search {
        width: 100%;
        margin-bottom: 1rem;
      }
      
      .table thead {
        display: none;
      }
      
      .table tbody tr {
        display: block;
        margin-bottom: 1rem;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
      }
      
      .table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        border: none;
        border-bottom: 1px solid #eee;
      }
      
      .table td:last-child {
        border-bottom: none;
      }
      
      .table td::before {
        content: attr(data-label);
        font-weight: 600;
        margin-right: 1rem;
      }
      
      .action-cell {
        justify-content: flex-end !important;
      }
      
      .action-label {
        display: inline-block;
      }
      
      .data-table-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class DataTableComponent<T> {
  @Input() columns: TableColumn[] = [];
  @Input() items: T[] = [];
  @Input() actions: TableAction[] = [];
  @Input() showSearch: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() searchPlaceholder: string = 'Search...';
  @Input() emptyMessage: string = 'No data available';
  @Input() pageSize: number = 10;
  @Input() selected: T | null = null;

  @Output() rowClick = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  @Output() searchChange = new EventEmitter<string>();

  filteredItems: T[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';

  ngOnChanges(): void {
    this.filterItems();
  }

  get totalItems(): number {
    return this.filteredItems.length;
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  onSearch(text: string): void {
    this.searchText = text;
    this.currentPage = 1;
    this.searchChange.emit(text);
    this.filterItems();
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({column, direction: this.sortDirection});
    this.filterItems();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
    this.filterItems();
  }

  onRowClick(item: T): void {
    this.selected = item;
    this.rowClick.emit(item);
  }

  private filterItems(): void {
    let filtered = [...this.items];
    
    // Apply search
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(item => {
        return this.columns.some(column => {
          const value = item[column.key as keyof T];
          return value !== undefined && 
                 value !== null && 
                 String(value).toLowerCase().includes(searchLower);
        });
      });
    }
    
    // Apply sorting
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortColumn as keyof T];
        const valueB = b[this.sortColumn as keyof T];
        
        if (valueA === valueB) return 0;
        
        const comparison = valueA < valueB ? -1 : 1;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    this.filteredItems = filtered;
    this.totalPages = Math.max(1, Math.ceil(this.filteredItems.length / this.pageSize));
    
    // Adjust current page if out of bounds
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}