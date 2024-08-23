import { ChangeDetectorRef, Component, Inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
//import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
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
    CommonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent implements OnInit{
  form: FormGroup
  loading: boolean = false;
  errorMessage = signal('');
  user = new User();

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { customIdName: string }, // Empfang der übergebenen Daten
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
  
  //  merge(this.email.statusChanges, this.email.valueChanges)
  //    .pipe(takeUntilDestroyed())
  //    .subscribe(() => this.updateErrorMessage());

    this.dialogRef.updateSize('auto'); // Hier wird die Dialoggröße aktualisiert
  }

  ngOnInit() {
    if (this.data.customIdName) {
      this.userService.getUser(this.data.customIdName).subscribe(user => {
        this.user = user;
        this.fillForm(user);
        console.log('User data:', user);
        this.cdr.markForCheck();
      });
    } else {
      console.log('No customIdName provided');
    }
  }

  fillForm(user: User) {
    const unixTimeStamp = user.birthday;
    const normalDate = new Date(unixTimeStamp * 1000);
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

//  updateErrorMessage() {
//    if (this.email.hasError('required')) {
//      this.errorMessage.set('You must enter a value');
//    } else if (this.email.hasError('email')) {
//      this.errorMessage.set('Not a valid email');
//    } else {
//      this.errorMessage.set('');
//    }
//  }

  saveUser() {
    debugger
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    // Copy form values to user object
    Object.assign(this.user, this.form.value);

    const birthDateValue = this.form.get('birthday')?.value;
    if (birthDateValue instanceof Date) {
      this.user.birthday = birthDateValue.getTime();  // Convert to Unix timestamp
    }

    this.userService.addUser(this.user).then(() => {
      this.loading = false;
      this.dialogRef.close();
    }).catch(error => {
      this.loading = false;
      console.error('error with adding user: ', error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
