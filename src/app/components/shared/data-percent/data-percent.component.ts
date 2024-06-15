import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-percent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-percent.component.html',
  styleUrls: ['./data-percent.component.css']
})
export class DataPercentComponent {


  @Input() percentage !:number
  @Input() bground !:string
  @Input() dataName!:string
}
