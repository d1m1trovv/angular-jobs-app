import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {Type} from "../../../../shared/components/jobs/models/type.interface";
import {Category} from "../../../../shared/components/jobs/models/category.interface";
import {Subject} from "rxjs";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {map, takeUntil} from "rxjs/operators";
import {Application} from "../../../../shared/components/jobs/models/application.interface";

@Component({
  selector: 'app-all-jobs-card-list',
  templateUrl: './all-jobs-card-list.component.html',
  styleUrls: ['./all-jobs-card-list.component.scss']
})
export class AllJobsCardListComponent implements OnInit {

  selectedType: string;
  jobs: Job[];
  currentJobs: Job[];
  jobTypes: Type[];
  jobCategories: Category[];

  destroy$ = new Subject<boolean>();

  constructor(private jobsService: JobsService) {
    this.jobs = [];
    this.currentJobs = [];
    this.jobTypes = [];
    this.jobCategories = [];
    this.selectedType = "";
  }

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs(): void{
    this.jobsService.getJobs().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.jobs = response[0];
      this.currentJobs = response[0];
      this.jobTypes = response[1];
      this.jobCategories = response[2];
    },(error => {
      console.log(error);
    }))
  }
}
