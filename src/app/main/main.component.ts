import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user = "Bastien";

  userClick() {
    alert('issou');
  }

  constructor(public dateService: DateService) { }

  ngOnInit() {
    this.dateService.date;
  }

}
