import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// import angular material modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  // style getting through input from parent
  @Input() Input_width!: any;
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';

  @Output() dataChange = new EventEmitter<string>();

  // inputted data pass to parent form
  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataChange.emit(value);
  }
}
