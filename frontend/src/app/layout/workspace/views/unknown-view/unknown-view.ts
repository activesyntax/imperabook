// src/app/layout/workspace/views/unknown-view/unknown-view.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-unknown-view',
  template: `
    <div class="unknown">⚠ Unknown view type: <code>{{ nodeType() }}</code></div>
  `,
  styles: `
    .unknown {
      padding: 12px 16px;
      border: 1px dashed #c4564b;
      border-radius: 6px;
      color: #c4564b;
      font-family: monospace;
      font-size: 0.85rem;
    }
  `,
})
export class UnknownView {
  nodeType = input.required<string>();
}
