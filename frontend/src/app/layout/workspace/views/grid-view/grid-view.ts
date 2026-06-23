import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-grid-view',
  imports: [MatGridListModule],
  templateUrl: './grid-view.html',
  styleUrl: './grid-view.scss',
})
export class GridView { }
