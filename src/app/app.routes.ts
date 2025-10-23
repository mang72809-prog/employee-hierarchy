import { Routes, provideRouter } from '@angular/router';
import { PositionListComponent } from './features/positions/components/position-list/position-list';
import { PositionFormComponent } from './features/positions/components/position-form/position-form';

export const routes: Routes = [
  { path: '', redirectTo: 'positions', pathMatch: 'full' },

  // Main list of positions
  { path: 'positions', component: PositionListComponent },

  // Add new position (optional parentId in state)
  { path: 'positions/new', component: PositionFormComponent },

  // Edit existing position
  { path: 'positions/:id/edit', component: PositionFormComponent },
];

export const appRouting = provideRouter(routes);
