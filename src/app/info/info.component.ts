import { Component } from '@angular/core';
import { GlobFunctionsService } from "./../services/glob-functions.service";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
constructor(private globFunctionsService: GlobFunctionsService){}

toggleDrawer() {
  this.globFunctionsService.toggleDrawer();
}
  
}
