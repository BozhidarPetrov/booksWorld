import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
  standalone: true,
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, maxCharCount = 100): unknown {
    return `${value.slice(0, maxCharCount)}${
      value.length > maxCharCount ? '...' : ''
    }`;
  }
}
