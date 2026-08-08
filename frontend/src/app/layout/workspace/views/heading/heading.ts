import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  template: `<h2 class="heading">{{ text() }}</h2>`,
  styleUrl: './heading.scss',
})
export class Heading {
  text = input.required<string>();
}
