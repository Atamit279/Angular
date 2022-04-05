import { Component, OnInit } from '@angular/core';
import {MainPageDTO} from "../../@core/dtos/MainPageDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainPageService} from "../../@core/main-page.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {invalid} from "@angular/compiler/src/render3/view/util";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainPageComponent implements OnInit {
  form!: FormGroup;
  editing: boolean = false;
  mainPage: MainPageDTO = new MainPageDTO();
  hide = true;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService,

  ) {
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }



  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: MainPageDTO): void {
    this.form = this.formBuilder.group({
      cb: [false, Validators.requiredTrue],
      login: [[data && data.login ? data.login : ''], [Validators.required, Validators.minLength(5)]],
      password: [[data && data.password ? data.password : ''], [Validators.required, Validators.minLength(5)]],
      conpassword: [[data && data.conpassword ? data.conpassword : ''], [Validators.required, Validators.minLength(5)]],
      age: [[data && data.age ? data.age : 0], [Validators.required]],
      email: [[data && data.email ? data.email : ""], [Validators.required, Validators.email, Validators.maxLength(40)]]
       },{validator: this.checkIfMatchingPasswords('password', 'conpassword')})
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }





  mockMethod(): void {
    this.form?.get('login')
  }

  toggleEditing(): boolean {
    this.editing = !this.editing
    return this.editing;
  }

  save(): void{
    this.editing = false;
    this.mainPage.login = this.form.get('login')?.value;
    this.mainPage.password = this.form.get('password')?.value;
    this.mainPage.age = this.form.get('age')?.value[0];
    this.mainPage.conpassword = this.form.get('conpassword')?.value;
    this.mainPage.email = this.form.get('email')?.value;
    this.mainPageService.save(this.mainPage).subscribe(data => {
      console.log(data);
    });

  }

  cancel(): void{
    this.editing = false;
    this.form.get('login')?.setValue(this.mainPage.login);
    this.form.get('password')?.setValue(this.mainPage.password);
    this.form.get('age')?.setValue(this.mainPage.age);
    this.form.get('conpassword')?.setValue(this.mainPage.conpassword);
    this.form.get('email')?.setValue(this.mainPage.email);
  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}

