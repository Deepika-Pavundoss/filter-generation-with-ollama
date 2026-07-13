import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { DeviceTableComponent } from './components/device-table.component/device-table.component';
import { TableModule } from 'primeng/table';
import { SearchComponent } from './components/search-component/search-component';

@NgModule({
  declarations: [
    App,
    SearchComponent,
    DeviceTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    TableModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
  ],
  bootstrap: [App]
})
export class AppModule { }
