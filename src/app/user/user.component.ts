import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  constructor(public dialog: MatDialog) { }
 

openDialog(){
console.log('openDialog starts');
this.dialog.open(DialogAddUserComponent);
}
}
