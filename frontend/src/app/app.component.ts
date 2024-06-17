import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <ngx-sonner-toaster />
    <button (click)="toast('My first toast')">Give me a toast</button>
  `,
})
export class AppComponent {
  protected readonly toast = toast;
  title = 'frontend';
}
