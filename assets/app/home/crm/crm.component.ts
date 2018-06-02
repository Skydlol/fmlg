import { Component, OnInit } from '@angular/core';
import { DemasyRequestService } from '../../shared/demasy-request.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  employees = [];

  constructor( private drService: DemasyRequestService ) { }

  ngOnInit() {
    this.drService.getEmployees().subscribe(
      data => {
        // console.log(data);
        this.employees = data.obj;
      },
      error => {
        console.log(error);
      }
  );
  }

}
