import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearTextDescription',
  standalone: true,
})
export class ClearTextDescriptionPipe implements PipeTransform {
  transform(text: string): unknown {
    if (!text) {
      return '';
    }
    // Reemplazar \n con <br> para saltos de línea
    let cleanedText = text.replace(/\n/g, ' ');
    // Eliminar \f
    cleanedText = cleanedText.replace(/\f/g, ' ');
    return cleanedText.toUpperCase();
  }
}
