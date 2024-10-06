import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romanToNumber',
  standalone: true,
})
export class RomanToNumberPipe implements PipeTransform {
  // Mapa para los valores de los números romanos
  private romanNumeralsMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  transform(value: string): unknown {
    if (!value) {
      return 0;
    }
    // Buscar el número romano después del guion
    const romanMatch = value.toUpperCase().match(/-(I|V|X|L|C|D|M)+$/);
    if (romanMatch) {
      const romanNumeral = romanMatch[0].replace('-', ''); // Removemos el guion
      return this.convertRomanToInteger(romanNumeral);
    }
    // Si no se encuentra ningún número, devolver 0 o lo que prefieras
    return 0;
  }
  // Función que convierte números romanos a enteros
  private convertRomanToInteger(roman: string): number {
    let total = 0;
    let previousValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = this.romanNumeralsMap[roman[i]];

      // Si el valor actual es menor que el valor anterior, lo restamos
      if (currentValue < previousValue) {
        total -= currentValue;
      } else {
        total += currentValue;
      }

      previousValue = currentValue;
    }

    return total;
  }
}
