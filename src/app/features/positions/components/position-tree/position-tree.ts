import { Component, Input, inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Position } from '../../../../core/models/position.model';
import { PositionsService } from '../../../../core/services/positions';

@Component({
  selector: 'app-position-tree',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './position-tree.html',
})
export class PositionTreeComponent {
  @Input() positions: Position[] = [];

  expandedDescriptions = new Set<number>();
  hiddenChildren = new Set<number>();
  
  // Modals
  addingParent?: Position;
  deletingPosition?: Position;

  // Fields for add child
  childName: string = '';
  childDescription: string = '';

  // Success message
  showSuccessMessage = false;
  successMessage = '';

  @ViewChild('deleteButton') deleteButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('addChildButton') addChildButton?: ElementRef<HTMLButtonElement>;

  private service = inject(PositionsService);
  private router = inject(Router);

  toggleDescription(id: number) {
    if (this.expandedDescriptions.has(id)) {
      this.expandedDescriptions.delete(id);
      this.showSuccess('Details hidden');
    } else {
      this.expandedDescriptions.add(id);
      this.showSuccess('Details shown');
    }
  }

  /** Toggle children visibility for ANY nodes with children */
  toggleChildren(positionId: number) {
    if (this.hiddenChildren.has(positionId)) {
      this.hiddenChildren.delete(positionId);
      this.showSuccess('Team expanded successfully');
    } else {
      this.hiddenChildren.add(positionId);
      this.showSuccess('Team collapsed successfully');
    }
  }

  /** Open modal to add child */
  openAddChildModal(pos: Position) {
    this.addingParent = pos;
    this.childName = '';
    this.childDescription = '';
    
    // Focus the save button after modal is shown
    setTimeout(() => {
      this.addChildButton?.nativeElement.focus();
    });
  }

  /** Actually add the child */
  addChild() {
    if (!this.addingParent || !this.childName.trim()) {
      return;
    }

    this.service.create({
      id: 0,
      name: this.childName.trim(),
      description: this.childDescription.trim() || `New role under ${this.addingParent.name}`,
      parentId: this.addingParent.id,
      children: [],
    });

    this.showSuccess(`Position "${this.childName.trim()}" added successfully`);
    this.closeModal();
  }

  edit(pos: Position) {
    this.router.navigate(['/positions', pos.id, 'edit']);
    this.showSuccess(`Editing position "${pos.name}"`);
  }

  /** Open delete modal */
  openDeleteModal(pos: Position) {
    this.deletingPosition = pos;
    
    // Focus the delete button after modal is shown
    setTimeout(() => {
      this.deleteButton?.nativeElement.focus();
    });
  }

  /** Confirm and execute deletion */
  confirmDelete() {
    if (this.deletingPosition) {
      const positionName = this.deletingPosition.name;
      this.service.delete(this.deletingPosition.id);
      this.showSuccess(`Position "${positionName}" deleted successfully`);
      this.closeModal();
    }
  }

  /** Show success message */
  showSuccess(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      this.hideSuccessMessage();
    }, 3000);
  }

  /** Hide success message */
  hideSuccessMessage() {
    this.showSuccessMessage = false;
  }

  closeModal() {
    this.addingParent = undefined;
    this.deletingPosition = undefined;
  }
}