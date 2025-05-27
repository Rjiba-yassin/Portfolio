import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="closeOnBackdrop ? close() : null" *ngIf="isOpen">
      <div class="modal-content" [class.modal-lg]="size === 'large'" [class.modal-sm]="size === 'small'" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="close-btn" aria-label="Close" (click)="close()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer" *ngIf="showFooter">
          <button type="button" class="btn btn-secondary" (click)="close()">{{ cancelText }}</button>
          <button type="button" class="btn btn-primary" [disabled]="primaryDisabled" (click)="onPrimaryClick()">{{ primaryText }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1050;
      animation: fadeIn 0.2s;
    }
    
    .modal-content {
      background-color: #fff;
      border-radius: 0.375rem;
      width: 500px;
      max-width: 95%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s;
    }
    
    .modal-lg {
      width: 800px;
    }
    
    .modal-sm {
      width: 300px;
    }
    
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    
    .modal-title {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    
    .close-btn:hover {
      opacity: 1;
    }
    
    .modal-body {
      padding: 1rem;
      max-height: calc(90vh - 130px);
      overflow-y: auto;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
      border-top: 1px solid #dee2e6;
      gap: 0.5rem;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showFooter: boolean = true;
  @Input() closeOnBackdrop: boolean = true;
  @Input() cancelText: string = 'Cancel';
  @Input() primaryText: string = 'Save';
  @Input() primaryDisabled: boolean = false;
  
  @Output() modalClose = new EventEmitter<void>();
  @Output() primaryClick = new EventEmitter<void>();

  close(): void {
    this.modalClose.emit();
  }

  onPrimaryClick(): void {
    this.primaryClick.emit();
  }
}