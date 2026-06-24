// src/app/layout/workspace/views/image-view/image-view.ts
import { Component, computed, input } from '@angular/core';
import * as V from '../view-node';

@Component({
  selector: 'app-image-view',
  template: `
    <figure class="image-view" [class]="variantClass()">
      <img [src]="view().src" [alt]="view().alt" />
      @if (view().caption; as caption) {
        <figcaption>{{ caption }}</figcaption>
      }
    </figure>
  `,
  styles: `
    .image-view {
      margin: 0;
      text-align: center;
    }
    .image-view img {
      height: auto;
      display: block;
      margin: 0 auto;
    }
    .image-view figcaption {
      margin-top: 20pt;
      font-size: 1.2rem;
      letter-spacing: 0.02em;
      color: var(--ib-text-muted, #b98a63);
    }

    .image-view--logo img      { max-width: 400px;  }
    .image-view--hero img      { max-width: 100%; }
    .image-view--cover img     { max-width: 160px; border-radius: 4px; }
    .image-view--thumbnail img { max-width: 64px;  border-radius: 3px; }
  `,
})
export class ImageView {
  view = input.required<V.ImageView>();

  // Default to 'logo' when the backend omits variant.
  variantClass = computed(() => `image-view--${this.view().variant ?? 'logo'}`);
}
