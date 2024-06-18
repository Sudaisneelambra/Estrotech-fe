import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  
  // style through selectors
  @Input() buttonStyles!: { [key: string]: string };
}
