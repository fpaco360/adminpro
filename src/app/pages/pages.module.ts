import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';

// components
import { IncremetandorComponent } from '../components/incremetandor/incremetandor.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncremetandorComponent,
    GraficaDonaComponent
],
exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
],
imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
]
})

export class PageModule {}
