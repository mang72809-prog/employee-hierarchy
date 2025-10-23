import { Component, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { PositionsService } from '../../../../core/services/positions';
import { PositionTreeComponent } from '../position-tree/position-tree';

@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [PositionTreeComponent],
  templateUrl: './position-list.html',
})
export class PositionListComponent implements OnInit {
  positions = computed(() => this.service.positions());

  constructor(private service: PositionsService, private router: Router) {}

  ngOnInit(): void {
    if (!this.service.positions().length) {
      this.service.fetchAll();
    }
  }

  addPosition() {
    this.router.navigate(['/positions/new']);
  }
}
