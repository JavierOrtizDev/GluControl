import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/loginResponse.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  usuario : string = '';
  password : string = '';
  mail: string = '';
  error : string = '';

  constructor(private authService: AuthServiceService, private router: Router ) { }

  recordar : boolean = false;
  mostrarModal : boolean = false;
  mensajeModal: string = '';
  

  verOlvidado(){
    this.recordar = true;
  }
  
  login() {
    const datoLogin : ILogin = {
      UserName: this.usuario,
      Password: this.password
    }
    
    this.authService.loginUser(datoLogin).subscribe( {
      next: (res) => {
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        this.error = err.error;
        console.log(this.error);
      }
    });
    }
  

  recordarPassword(){
    this.recordar = false;
    this.mensajeModal = 'Tu solicitud de recuperación de contraseña ha sido enviada. Por favor, revisa tu correo electrónico.';
    this.mostrarModal = true;
  }


  formularioInvalido() {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(this.mail)) {
      return true;
    }
    return false;
  }
}

