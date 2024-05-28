import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { RegisterState } from 'src/app/interface/appstates';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  readonly DataState = DataState;
  registerState$ : Observable<RegisterState> = of({ dataState: DataState.LOADED, registerSuccess:false});
  private isClosed = new BehaviorSubject<boolean>(false);
  isClosed$ = this.isClosed.asObservable();


  constructor(private userService: UserService) {

  }
  register(registerForm: NgForm):void {
    this.registerState$ = this.userService.save$(registerForm.value)
    .pipe(
      map(response => {
        registerForm.reset();
        return {dataState: DataState.LOADED, registerSuccess: true, message: response.message};
      }),
      startWith({dataState: DataState.LOADING, registerSuccess: false}),
      catchError((error: string) => {
        this.isClosed.next(true);
        return of({ dataState: DataState.ERROR, registerSuccess: false, error: error})
      })
    );
  }

  createAccountForm():void {
    this.registerState$ = of({dataState: DataState.LOADED, registerSuccess: false});
  }

}
