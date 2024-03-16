import { Pipe, PipeTransform } from '@angular/core';
import {defaultUrlMatcher} from "@angular/router";

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {
  transform( arr: any[] ): any[] {
    const pares = arr.reduce( (result, value, index, array) => {
      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    // console.log(pares)
    return pares;
  }

}
