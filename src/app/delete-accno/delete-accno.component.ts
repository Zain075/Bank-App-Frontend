import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-accno',
  templateUrl: './delete-accno.component.html',
  styleUrls: ['./delete-accno.component.css']
})
export class DeleteAccnoComponent {

  @Input() deleteAccno:any

//userdefined event - onCancel event
  @Output() onCancel = new EventEmitter();//It helps us to create a new user defined event
  @Output() onDelete = new EventEmitter();
  cancel(){
    this.onCancel.emit()
    //Emits an event containing a given value.To connect child(delte-accno) to parent(dashboard)


  }

  deleteAccount(){
    this.onDelete.emit()
  }
}
