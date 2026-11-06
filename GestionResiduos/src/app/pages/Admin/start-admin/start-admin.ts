import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-start-admin',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './start-admin.html',
  styleUrls: ['./start-admin.scss']
})
export class StartAdmin {
  cards = [
    { icon: 'map-pin', title: 'Mapa de Eco-Puntos', description: 'Encuentra los puntos de recolección más cercanos.', link: '/dashboard/eco-puntos' },
    { icon: 'calendar', title: 'Calendario de Recolección', description: 'Consulta las fechas y horarios de recolección.', link: '/dashboard/calendario-recoleccion' },
    { icon: 'alert-triangle', title: 'Reporte de Puntos Críticos', description: 'Reporta acumulaciones de residuos.', link: '/dashboard/reportes' },
    { icon: 'book-open', title: 'Educación Ambiental', description: 'Aprende a separar residuos correctamente.', link: '/dashboard/educacion' },
    { icon: 'trending-up', title: 'Seguimiento de Progreso', description: 'Monitorea tu impacto ambiental.', link: '/dashboard/seguimiento' },
    { icon: 'message-square', title: 'Foro Comunitario', description: 'Comparte ideas con la comunidad.', link: '/dashboard/foro' },
  ];
  ngAfterViewInqit() {
    // Icons are rendered as Lucide components in templates; no runtime replace required.
  }
}

