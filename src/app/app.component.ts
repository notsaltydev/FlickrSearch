import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FlickrService} from "./service/flickr-search.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Overlay, overlayConfigFactory} from 'angular2-modal';
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {PhotoDetailModal} from "./additional/photo-detail.modal";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchControl = new FormControl();
  // model$: Observable<any>;
  photos: Object;

  constructor(private _formBuilder: FormBuilder, private _flickrService: FlickrService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  showPhoto(photo){
    return this.modal.open(PhotoDetailModal, overlayConfigFactory({ items: photo, size: 'lg'}, BSModalContext));
  }

  nextTab(url){
    window.open( url,'_blank');
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query: string) => this._flickrService.getResult(query))
      .subscribe(value => {
        this.photos = value;
      });
  }
}
