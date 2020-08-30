import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({ name: 'toFixed' })
export class ToFixedPipe implements PipeTransform {
    transform(num: number, n) {
        return num.toFixed(n | 2);
    }
}