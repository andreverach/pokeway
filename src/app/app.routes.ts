import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        loadChildren: () => import('./domains/pokedex/features/pokedex.routes')
    }
];
