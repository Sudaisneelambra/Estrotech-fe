import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.css'],
  standalone:true,
  imports:[CommonModule,CapitalizePipe]
})
export class SecondNavComponent {

  @Input() Route!:string
  @Output() booleanValue= new EventEmitter()

  bool:boolean= true

  handleClick(){      
      this.booleanValue.emit(this.bool)
      this.bool =!this.bool
  }

  get RouteSegments() {
    return this.Route.split('/');
  }
}
