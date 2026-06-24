import { Component, input } from '@angular/core';

@Component({
  selector: 'app-unknown-view',
  template: './unknown-view.html',
  styleUrl: './unknown-view.scss',
})
export class UnknownView {
  nodeType = input.required<string>();
}
