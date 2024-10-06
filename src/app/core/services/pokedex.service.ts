import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private httpClient = inject(HttpClient);
  //private loadingService = inject(LoadingService);
  private baseUrl = environment.apiV2;
}
