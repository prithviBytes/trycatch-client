import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  registerForm!: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues('password')])
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.parent && control.parent.controls) {
        return control?.value === (control?.parent?.controls as { [key: string]: AbstractControl })[matchTo].value ? null : {isMatching: true}
      }
      return null;
    }
  }

  register(){
    console.log(this.registerForm);
    // this.accountService.register(this.model).subscribe(response => {
    //   this.cancel();
    // }, error => this.toastr.error(error.error))
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
