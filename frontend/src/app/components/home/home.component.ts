import { Component, inject } from '@angular/core';
import { TrabajosService } from '../../services/trabajos.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  toastrService = inject(ToastrService);
  trabajosService = inject(TrabajosService);

  listadoTrabajosArray: any[] = [];
  listadoTrabajosFiltro: any[] = [];

  searchForm = new FormGroup({
    term: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.loadAllJobs();
  }

  loadAllJobs() {
    this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
      this.listadoTrabajosArray = res.datosParaLeerTodos;
      // this.listadoTrabajosFiltro = this.listadoTrabajosArray;
      console.log('listadoTrabajosArray :>> ', this.listadoTrabajosArray);
    });
  }
  applyBtn() {
    this.toastrService.success('Applied!');
  }

  handleInputSearch() {
    const filtered = this.listadoTrabajosArray.filter((search) =>
      search.nombreTrabajoSubmit.includes(this.searchForm.value.term)
    );
    console.log('filtered :>> ', filtered);
    if (this.searchForm.value.term === '') {
      this.loadAllJobs();
    }
    if (filtered.length > 0) {
      this.listadoTrabajosArray = filtered;
    } else {
      this.loadAllJobs();
    }
  }
}
