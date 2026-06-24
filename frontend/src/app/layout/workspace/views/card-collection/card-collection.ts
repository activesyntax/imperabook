// src/app/layout/workspace/views/card-collection/card-collection.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-collection',
  template: `
    <div class="card-collection">
      <ng-content />
    </div>
  `,
  styles: `
    .card-collection {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }
  `,
})
export class CardCollection { }
