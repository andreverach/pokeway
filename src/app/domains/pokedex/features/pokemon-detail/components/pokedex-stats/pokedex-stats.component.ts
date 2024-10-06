import { Component, input, OnInit, ViewChild } from '@angular/core';
import { PokemonInfo } from '../../../../../../core/interfaces/pokemonInfo';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { ChartType, ChartConfiguration, ChartData } from 'chart.js';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokedex-stats',
  standalone: true,
  imports: [BaseChartDirective, UpperCasePipe],
  templateUrl: './pokedex-stats.component.html',
  styleUrl: './pokedex-stats.component.scss',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PokedexStatsComponent implements OnInit {
  pokemonData = input<PokemonInfo | null>(null);
  //datos para el grafico
  barChartLegend = true;
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'STATS' }],
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    color: '#064e3b',
    borderColor: '#064e3b',
    backgroundColor: '#4438ca',//#10b981
    indexAxis: 'y', //asi lo hago horizontal porque por defecto el indexAxis es X
  };

  ngOnInit(): void {
    console.log(this.pokemonData());
    this.makeRadarChart();
  }
  makeRadarChart() {
    const labels: string[] = ['HEIGHT', 'WEIGHT'];
    const values: number[] = [
      this.pokemonData()?.height || 0,
      this.pokemonData()?.weight || 0,
    ];
    this.pokemonData()?.stats.map((stat) => {
      labels.push((stat.stat.name.toUpperCase()));
      values.push(stat.base_stat);
    });
    this.barChartData.datasets[0].data = values || [];
    this.barChartData.labels = labels;
  }
}
