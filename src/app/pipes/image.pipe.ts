import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

const URL:string = environment.imgPath;
@Pipe({
  name: 'imagen'
})
export class ImagePipe implements PipeTransform {

  transform(img: string='', size: string='w500'): string {

    if (!img) {
      return './assets/angular-explore-banner.jpg';
    }

    const imgUrl = `${URL}/${size}${img}`;
    // console.log("url",imgUrl);

    return imgUrl;
  }

}
