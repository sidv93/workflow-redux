import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { Observable } from '../../../node_modules/rxjs';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private store: Store<AuthState>) { 
    this.loginForm = fb.group({
      'userId': [''],
      'password': [''],
      'rememberMe': ['']
    });
  }

  ngOnInit() {
  }

  public login(formValues: any): void {
    if(formValues.userId && formValues.password) {
      this.store.dispatch(new AuthActions.Authenticate(formValues));
    }
  }

}
