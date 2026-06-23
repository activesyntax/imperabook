import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ImageView } from "./views/image-view/image-view";
import { GridView } from "./views/grid-view/grid-view";
import { CardView } from "./views/card-view/card-view";
import { MessageView } from "./views/message-view/message-view";

@Component({
  selector: 'app-workspace',
  imports: [ImageView, GridView, CardView, MessageView],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace { }
