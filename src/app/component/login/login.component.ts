import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { Key } from 'src/app/enum/key.enum';
import { LoginState } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginState$: Observable<LoginState> = of({dataState: DataState.LOADED});
  private phoneSubject = new BehaviorSubject<string>('null');
  private emailSubject = new BehaviorSubject<string>('null');
  readonly DataState = DataState;

  constructor(private router: Router, private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.isAuthenticated() ? this.router.navigate(['/']) : this.router.navigate(['/login']);
  }


  login(loginForm: NgForm) {
    this.loginState$ = this.userService.login$(loginForm.value.email, loginForm.value.password)
    .pipe(map(response => {
      if(response?.data?.user?.isUsingMfa) {
        this.phoneSubject.next('722145');
        this.emailSubject.next('bleble');
        return ({ dataState: DataState.LOADED, isUsingMfa: true, loginSucess: true})
      } else {
        localStorage.setItem(Key.TOKEN, response.data.access_token);
        localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        this.router.navigate(['/']);
        return ({dataState: DataState.LOADED, isUsingMfa: false});
      }
    }),
      startWith({dataState: DataState.LOADING, isUsingMfa: false}),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, isUsingMfa: false, loginSuccess: false, error: error})
      })
    )
  }

}
