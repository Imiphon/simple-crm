import { ChangeDetectorRef, Component, Inject, OnInit, signal, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE  } from '@angular/material/core';
import { GlobFunctionsService } from '../services/glob-functions.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-edit-head',
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
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter }, // Hinzufügen dieses Providers
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Optional: Locale einstellen
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Optional für benutzerdefinierte Formate
  ],
  templateUrl: './dialog-edit-head.component.html',
  styleUrl: './dialog-edit-head.component.scss'
})
export class DialogEditHeadComponent implements OnInit {
  form: FormGroup
  loading: boolean = false;
  errorMessage = signal('');
  user = new User();

  constructor(    
    public dialogRef: MatDialogRef<DialogEditHeadComponent>,
    private userService: UserService,
    private globService: GlobFunctionsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { customIdName: string }, // Empfang der übergebenen Daten
    private cdr: ChangeDetectorRef,
    @Inject(Router) private router: Router // Inject the Router

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
    this.dialogRef.updateSize('auto');
  }

  ngOnInit() {
    if (this.data.customIdName) {
      this.userService.getUser(this.data.customIdName).subscribe(user => {
        this.user = user;
        this.fillForm(user);
        this.cdr.markForCheck();
      });
    } else {
      console.log('No customIdName provided');
    }
  }

  fillForm(user: User) {
    const unixTimeStamp = user.birthday;
    const normalDate = new Date(unixTimeStamp);
    this.form.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      houseNumber: user.houseNumber,
      city: user.city,
      zip: user.zip,
      email: user.email,
      tel: user.tel,
      birthday: normalDate,
      customIdName: user.customIdName
    });
  }

  editUser() {
    if (this.form.valid) {
      this.loading = true;
      const birthDateValue = this.form.get('birthday')?.value;
      if (birthDateValue instanceof Date) {
        this.form.patchValue({ birthday: birthDateValue.getTime() }); //set Unix-Timestamp 
      }
      const updatedUserData = this.form.value;
      this.userService.updateUser(this.data.customIdName, updatedUserData)
        .then(() => {
          this.loading = false;
          this.dialogRef.close(updatedUserData);
          this.openUser();
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    }
  }

  openUser() {
    window.location.reload();
    const userId = this.form.get('birthday')?.value;
    this.router.navigate(['/user-details', userId]); // Navigate to UserDetailsComponent
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}