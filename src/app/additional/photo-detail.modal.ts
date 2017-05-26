import {Component, OnInit} from '@angular/core';

import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {Http} from '@angular/http';
import {FlickrService} from '../service/flickr-search.service';

export class CustomModalContext extends BSModalContext {
  public items: number;
  public num2: number;
}

@Component({
  templateUrl: './photo-detail.modal.html',
  styleUrls: ['./photo-detail.modal.css']
})


export class PhotoDetailModal implements ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  exif: any;

  constructor(public dialog: DialogRef<CustomModalContext>, private _flickrService: FlickrService) {
    this.context = dialog.context;
  }

  close() {
    this.dialog.close();
  }

  showExif(id) {
    this._flickrService.getExif(id)
      .subscribe(
        exif => this.exif = exif
      );
  }


}
