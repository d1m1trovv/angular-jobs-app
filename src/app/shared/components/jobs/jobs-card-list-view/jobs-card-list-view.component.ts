import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.interface";

@Component({
  selector: 'app-jobs-card-list-view',
  templateUrl: './jobs-card-list-view.component.html',
  styleUrls: ['./jobs-card-list-view.component.scss']
})
export class JobsCardListViewComponent implements OnInit {

  @Input() jobs: Job[];

  constructor() {
    this.jobs = [];
  }

  ngOnInit(): void {
  }

}
