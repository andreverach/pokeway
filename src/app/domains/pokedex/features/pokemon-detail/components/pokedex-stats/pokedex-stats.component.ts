import {
  Component,
  effect,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PokemonInfo } from '../../../../../../core/interfaces/pokemonInfo';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokedex-stats',
  standalone: true,
  imports: [BaseChartDirective, JsonPipe],
  templateUrl: './pokedex-stats.component.html',
  styleUrl: './pokedex-stats.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PokedexStatsComponent implements OnInit {
  pokemonData = input<PokemonInfo | null>(null);
  //datos para el grafico
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'STATS' }],
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    color: '#064e3b',
    borderColor: '#064e3b',
    backgroundColor: '#4438ca', //#10b981
    indexAxis: 'y', //asi lo hago horizontal porque por defecto el indexAxis es X
  };

  /* constructor() {
    effect(() => {
      if (this.pokemonData()) {
        console.log('IF effect', this.pokemonData());
        this.makeRadarChart();
      }
    });
  } */

  ngOnInit(): void {
    //console.log('onInit', this.pokemonData());
    this.makeRadarChart();
    //con el efecto puedo estar al tanto de cuando un signal ha cambiado su valor y realizar algo
    //computed hace lo mismo pero asigna un nuevo valor en base a lo realizado, a una nueva variable
    //en este caso solo quiero hacer algo en base al input que tengo cuando ya tenga un dato dentro
    //finalmente no opte por esta solucion, el grafico no se muestra porque recibe la data luego de que el servicio responda
    //en los casos de que se llego a esta vista desde la url y asi no se tiene la data al momento
    //se soluciono con un if en el pokemon-detail y solo carga este componente cuando ya tiene los stats en la data
  }

  makeRadarChart() {
    const labels: string[] = ['HEIGHT', 'WEIGHT'];
    const values: number[] = [
      this.pokemonData()?.height || 0,
      this.pokemonData()?.weight || 0,
    ];
    this.pokemonData()?.stats.map((stat) => {
      labels.push(stat.stat.name.toUpperCase());
      values.push(stat.base_stat);
    });

    /* this.barChartData.update((prevState) => {
      prevState.datasets[0].data = [...values];
      prevState.labels = [...labels];
      return prevState;
    }); */
    this.barChartData.datasets[0].data = values || [];
    this.barChartData.labels = labels;
    //console.log('this.barChartData', this.barChartData);
  }
}
