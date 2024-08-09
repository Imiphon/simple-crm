import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../../models/user.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birthday: ['', Validators.required],
      customIdName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const customIdName = params.get('id');
      if (customIdName) {
        this.userService.getUser(customIdName).subscribe(user => {
          this.user = user;
          this.fillForm(user);
          console.log('User data:', user); // Display user data in console
          this.cdr.markForCheck(); // Manuell die Change Detection auslösen
        });
      } else {
        console.log('no customIdName');
        
      }
    });
  }

  fillForm(user: User) {
    const unixTimeStamp = user.birthday;
    const normalDate = new Date(unixTimeStamp * 1000);
    const formattedDate = normalDate.toLocaleDateString(); 
    this.form.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      houseNumber: user.houseNumber,
      city: user.city,
      zip: user.zip,
      email: user.email,
      tel: user.tel,
      birthday: formattedDate,
      customIdName: user.customIdName
    });
  }
}
