import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Job} from "../models/job.interface";
import {Subject} from "rxjs";
import {JobsService} from "../services/jobs.service";
import {map, takeUntil} from "rxjs/operators";
import {Type} from "../models/type.interface";
import {Category} from "../models/category.interface";


@Component({
  selector: 'app-jobs-card-list',
  templateUrl: './jobs-card-list.component.html',
  styleUrls: ['./jobs-card-list.component.scss']
})
export class JobsCardListComponent implements OnInit, OnChanges {

  selectedType: string;

  @Input()currentJobs: Job[];
  @Input()jobs: Job[];
  @Input()jobTypes: Type[];
  @Input()jobCategories: Category[];

  constructor() {
    this.jobs = [];
    this.currentJobs = [];
    this.jobTypes = [];
    this.jobCategories = [];
    this.selectedType = "";
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void{

  }

  getJobsByCategory(category: string): void{
    let newJobs: Job[];
    if(category === "All"){
      this.currentJobs = this.jobs;
      return
    }
    newJobs = this.jobs.filter(item => item.category === category);
    this.currentJobs = newJobs;
  }

  getJobsByType(type: string): void{
    let newJobs: Job[];
    if(type === "All"){
      this.currentJobs = this.jobs;
      return;
    }
    newJobs = this.jobs.filter(item => item.type === type);
    this.currentJobs = newJobs;
  }

}
