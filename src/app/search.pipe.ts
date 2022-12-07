import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Product: any [] , term : string ): any[] {
    return Product.filter((item) => item.address.includes(term));
  }

}
