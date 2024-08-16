import { ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-log-in',
  templateUrl: './fb-log-in.component.html',
  styleUrls: ['./fb-log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class FbLogInComponent implements OnDestroy{
  public loginForm: FormGroup;
  public errorMessage: string;
  private readonly _EMPTY: string = '';
  
  private loginSubscription: Subscription;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.errorMessage = this._EMPTY;

    this.loginForm = this.fb.group({
      user: [this._EMPTY, Validators.required],
      passwords: [this._EMPTY, Validators.required],
    });
    this.loginSubscription = new Subscription;
  }


  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { user, passwords } = this.loginForm.value;

      this.loginSubscription = this.authService.login(user, passwords).subscribe({ //como desuscribirse (rx js), observables que es
        next: (isAuthenticated:boolean) => {
          if (isAuthenticated) {
            this.router.navigate(['/secure']); 
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error: () => {
          this.errorMessage = 'Error con el inicio de sesión';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
