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

  ngOnInit() {
    this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
      this.listadoTrabajosArray = res.datosParaLeerTodos;
    });
  }

  applyBtn() {
    this.toastrService.success('Applied!');
  }
  // handleSubmitSearch() {
  //   const filtered = this.listadoTrabajosArray.filter((search) => {
  //     return search.nombreb === this.searchForm.value.term;
  //   });
  //   if (filtered.length > 0) {
  //     this.caps = filtered;
  //     this.toastrService.info('Caps found: ' + filtered.length);
  //   } else {
  //     this.caps = this.allCaps;
  //     this.toastrService.info(
  //       'Caps ' + this.searchForm.value.term + ' not found'
  //     );
  //   }
  // }
}
