import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService, // Variável em minúsculo
    private messageService: MessageService // Variável em minúsculo
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            // Salvando o token nos cookies
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer o login!`,
            life: 2000,
          });
          console.log(err);
        },
      });
    }
  }

  onSubmitSignUpForm(): void {
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService
        .signupUser(this.signUpForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signUpForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário criado com sucesso!',
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar o usuário',
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }
}
