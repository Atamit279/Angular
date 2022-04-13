import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DialogElementsExampleDialog, MainPageComponent} from './main-component/main-component.component';
import {createCustomTheme} from "@angular/material/schematics/ng-add/theming/create-custom-theme";
import {createCustomElement} from "@angular/elements";
import {MainPageService} from "../@core/main-page.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MainMenuComponent } from './main-component/main-menu/main-menu/main-menu.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes =[
  { path: 'menu', component: MainMenuComponent},
  { path: 'registration', component: MainPageComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainMenuComponent
  ],
  imports: [
    MatTabsModule,
    MatCheckboxModule,
    BrowserModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const mainPage = createCustomElement(MainPageComponent, {injector: this.injector});
    customElements.define("main-page", mainPage)
    const mainMenu = createCustomElement(MainMenuComponent, {injector: this.injector});
    customElements.define("main-menu", mainMenu)

  }




}
