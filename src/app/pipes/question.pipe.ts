import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
