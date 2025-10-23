import { Injectable, signal } from '@angular/core';
import { Position } from '../models/position.model';

@Injectable({ providedIn: 'root' })
export class PositionsService {
  positions = signal<Position[]>([]);
  private nextId = 4;

  constructor() {}

  // Mock fetch
  fetchAll() {
    const mockData: Position[] = [
      {
        id: 1,
        name: 'CEO',
        description: 'Chief Executive Officer',
        children: [
          { id: 2, name: 'CTO', description: 'Tech Lead', children: [] },
          { id: 3, name: 'CFO', description: 'Finance Lead', children: [] },
        ],
      },
    ];
    setTimeout(() => this.positions.set(mockData), 200);
  }

  getById(id: number, nodes?: Position[]): Position | undefined {
    const list = nodes ?? this.positions();
    for (const node of list) {
      if (node.id === id) return node;
      if (node.children?.length) {
        const found = this.getById(id, node.children);
        if (found) return found;
      }
    }
    return undefined;
  }

  create(data: Position) {
    data.id = this.nextId++;
    data.children = [];

    if (data.parentId) {
      const parent = this.getById(data.parentId);
      if (parent) {
        parent.children = [...(parent.children ?? []), data];
        this.positions.set([...this.positions()]);
      }
    } else {
      this.positions.set([...this.positions(), data]);
    }
  }

  update(id: number, data: Position) {
    const pos = this.getById(id);
    if (pos) {
      pos.name = data.name;
      pos.description = data.description;
      this.positions.set([...this.positions()]);
    }
  }

  /** ✅ Delete any node — root or nested */
  delete(id: number) {
    // Create a deep clone first to avoid reference issues
    const positionsCopy = this.deepClone(this.positions());
    const updated = this.removeNode(positionsCopy, id);
    this.positions.set(updated);
  }

  /** Recursively remove node from tree */
  private removeNode(nodes: Position[], id: number): Position[] {
    return nodes
      .filter(node => node.id !== id) // Remove target node (even root)
      .map(node => ({
        ...node,
        children: node.children ? this.removeNode(node.children, id) : [],
      }));
  }

  /** Deep clone the positions array to avoid reference issues */
  private deepClone(positions: Position[]): Position[] {
    return positions.map(pos => ({
      ...pos,
      children: pos.children ? this.deepClone(pos.children) : []
    }));
  }
}