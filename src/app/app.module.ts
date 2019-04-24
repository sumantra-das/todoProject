import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared-modules/app-routing.module';
import { AppComponent } from './app.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import {FormsModule} from '@angular/forms';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectmanagementComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
