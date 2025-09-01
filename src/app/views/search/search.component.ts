import {Component, OnInit} from '@angular/core';
import {SearchComponent as SharedSearchComponent} from '../../shared/search/search.component';
import {ResultsComponent} from './sections/results/results.component';
import {BackendService} from '../../services/backend';
import {BookingService} from '../../services/booking';

@Component({
  selector: 'app-view-search',
  standalone: true,
  imports: [
    SharedSearchComponent,
    ResultsComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
buses:any=[];
constructor(public backendService:BackendService,public bookingService:BookingService){
}
ngOnInit(): void {
    this.getPayload();
}

async getPayload(){
  let data = await this.bookingService.getPayload();
  this.backendService.getTrips(data).subscribe((res)=>{
    this.buses=res.data
  })
}

}
