import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobFunctionsService } from "./services/glob-functions.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(private router: Router, private globFunctionsService: GlobFunctionsService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //console.log('NavigationEnd:', event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    if(this.drawer){
      this.globFunctionsService.setDrawer(this.drawer);
    }
  }

  title = 'simple-crm';
  opened: boolean | undefined;

  toggleDrawer() {
    this.drawer?.toggle();
  }
}
