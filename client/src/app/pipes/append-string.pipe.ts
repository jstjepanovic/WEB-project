import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendString'
})
export class AppendStringPipe implements PipeTransform {

  transform(value: string, appendString: string): string {
    return value + appendString;
  }

}
