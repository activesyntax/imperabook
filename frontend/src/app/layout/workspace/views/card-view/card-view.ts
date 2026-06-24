// src/app/layout/workspace/views/card-view/card-view.ts
import { Component, input } from '@angular/core';
import * as CV from '../view-node';

@Component({
  selector: 'app-card-view',
  template: `
    <article class="card">
      <header class="card__heading">{{ view().heading }}</header>
      <div class="card__value">{{ view().value }}</div>
      @if (view().caption; as caption) {
        <footer class="card__caption">{{ caption }}</footer>
      }
    </article>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 24px 20px;
      background: var(--ib-surface, #161616);
      border: 1px solid var(--ib-border, #2a2a2a);
      border-radius: 8px;
    }
    .card__heading {
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.8rem;
      color: var(--ib-accent, #c8763f);
    }
    .card__value {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1;
      color: var(--ib-text, #f5f0e8);
    }
    .card__caption {
      font-size: 0.85rem;
      color: var(--ib-text-muted, #8a7a6a);
    }
  `,
})
export class CardView {
  view = input.required<CV.CardView>();
}
