import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: false,
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent {
  @Input() formFields: any[] = [];   
  @Input() formGroup!: FormGroup;
  @Input() onSubmit: () => void = () => {};
  @Input() title: string = 'Form';
  @Input() description: string = 'Please fill in this form.';
  @Input() submitButtonText: string = 'Submit';
  @Input() redirectText: string = '';
  @Input() redirectLink: string = '';
  @Input() redirectLinkText: string = '';

  onSubmitClicked(){
    this.onSubmit()
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.formGroup?.get(controlName);
    if(control?.hasError(error)){
      if(control.touched){
        return true;
      }
    }
    return false;
  }
}
