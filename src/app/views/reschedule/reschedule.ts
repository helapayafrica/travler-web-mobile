import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend';
import { ToastrService } from 'ngx-toastr';
import {ResultsComponent} from '../search/sections/results/results.component';

@Component({
  selector: 'app-reschedule',
  imports: [FormsModule, ReactiveFormsModule, ResultsComponent],
  templateUrl: './reschedule.html',
  styleUrl: './reschedule.scss'
})
export class Reschedule implements OnInit {

  backendService = inject(BackendService)
  toastr = inject(ToastrService)
rescheduleForm!: FormGroup;


ngOnInit(): void {
  this.rescheduleForm = new FormGroup({
    ticket : new FormControl('', Validators.required),
    newDate :new FormControl('', Validators.required),
  });
}

isLoading = true
buses = []


onSubmit(){
  console.log(this.rescheduleForm.value);
  this.backendService.rescheduleTicket(this.rescheduleForm.value).subscribe({
    next: (res)=>{
      console.log(res)
        // TODO: add the check for depurture date get the busses to add to the Results Component
        const departureDate = res.data.departure_date;
        if(this.checkDate(departureDate)){
          console.log("['Reschedule Success']", res);

        // redirect to choose the new bus
        //save to localstorage

        }else{
          this.toastr.error('Rescheduling is only allowed for trips departing more than 8 hours from now.', 'Cannot Reschedule');

        }
      },
      error: (error) => console.error('Error rescheduling ticket:', error),

  })
}




checkDate(dateString: string): boolean {
  const departureTime = new Date(dateString);
  const currentDate = new Date();
  // check if the is more than 8 hours from now
  const hoursDifference = (departureTime.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
  return hoursDifference >= 8;
}

}
