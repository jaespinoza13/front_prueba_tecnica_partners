import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const persona = {
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        email: this.registroForm.value.email,
      };

      this.http.post('http://localhost:5000/api/personas', persona).subscribe((response) => {
        const usuario = {
          usuario: this.registroForm.value.usuario,
          password: this.registroForm.value.password,
          //personaId: response['id'] // id de la persona creada
        };

        this.http.post('http://localhost:5000/api/usuarios', usuario).subscribe();
      });
    }
  }
}