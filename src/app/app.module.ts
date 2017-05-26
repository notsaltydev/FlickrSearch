import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {FlickrService} from './service/flickr-search.service';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {PhotoDetailModal} from './additional/photo-detail.modal';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDetailModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    HttpModule
  ],
  entryComponents: [PhotoDetailModal],
  providers: [FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
