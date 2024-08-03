import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: number = 0;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profilephoto: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatchValidator() });
  }

  next() {
      if (this.register < 2) {
        this.register= this.register + 1;
    
      } else {
        if (this.registerForm.valid) {
        this.dataF();
      }
      else{
        alert('Faltan datos')
      }
    } 
  }

  back() {
    if (this.register == 0) {
      this.router.navigate(['']);
    } else {
      this.register--;
    }
  }

  dataF() {
    console.log(this.registerForm.value);
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const photoDrop = document.querySelector('.photo-drop') as HTMLElement;
        photoDrop.style.backgroundImage = `url(${e.target.result})`;
        photoDrop.style.backgroundSize = 'cover';
        photoDrop.style.backgroundPosition = 'center';
        const icon = document.querySelector('.person-icon') as HTMLElement;
        if (icon) icon.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const photoDrop = document.querySelector('.photo-drop') as HTMLElement;
        photoDrop.style.backgroundImage = `url(${e.target.result})`;
        photoDrop.style.backgroundSize = 'cover';
        photoDrop.style.backgroundPosition = 'center';
        const icon = document.querySelector('.person-icon') as HTMLElement;
        if (icon) icon.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}

// Validador de confirmación de contraseña
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  };
}