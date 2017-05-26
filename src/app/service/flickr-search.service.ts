/**
 * Created by Adam on 10/29/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
  // result$: Observable<any>;
  key = '5283915f22dd5ba12050d3086d67f5e9';

  constructor(private _http: Http) {
  };

  getResult(query: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${query}&per_page=30&format=json&nojsoncallback=1`;
    return this._http
      .get(url)
      .map(res => res.json())
      .map((data) => {
        if (data.stat === 'ok') {
          return data.photos.photo.map((photo: any) => {
            return {
              url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
              title: photo.title,
              id: photo.id
            };
          });
        }
        else {
          return [];
        }
      });
  }

  getExif(photoId: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${this.key}&photo_id=${photoId}&format=json&nojsoncallback=1`;
    return this._http
      .get(url)
      .map(res => res.json())
      .map((data) => {
        if (data.stat === 'ok') {
          return data.photo.exif.map((exifInfo: any) => {
            return {
              make: exifInfo.label,
              model: exifInfo.raw._content
            };
          });
        }
        else {
          return [];
        }
      });
  }


}
