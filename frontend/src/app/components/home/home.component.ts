import { Component, inject } from '@angular/core';
import { TrabajosService } from '../../services/trabajos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  trabajosService = inject(TrabajosService);

  listadoTrabajos: any[] = [];

  ngOnInit() {
    this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
      this.listadoTrabajos = res.datosParaLeerTodos;
    });
  }
}
