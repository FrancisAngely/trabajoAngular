import { Component, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { IDemoNgComponentEventType } from "../ng-template-ref-event-type";


@Component({
  selector: 'app-ng-template-ref',
  standalone: false,
  
  templateUrl: './ng-template-ref.component.html',
  styleUrl: './ng-template-ref.component.css'
})
export class NgTemplateRefComponent {

  constructor() {}

  @Output()
  emitter = new Subject<IDemoNgComponentEventType>();

  @Input()
  data = {};
  @Input()
  actionText = 'Eliminar';
  @Input()
  actionText2 = 'Editar';
  

  ngOnInit(): void {}

  onAction1() {
   
    this.emitter.next({
      cmd: "action1",
      data: this.data,
  
    });
  }
  onAction2() {
   
    this.emitter.next({
      cmd: "action2",
      data: this.data,
  
    });
  }
  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}
