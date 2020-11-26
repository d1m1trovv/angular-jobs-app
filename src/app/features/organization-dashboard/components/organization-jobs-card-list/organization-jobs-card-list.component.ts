import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {Type} from "../../../../shared/components/jobs/models/type.interface";
import {Category} from "../../../../shared/components/jobs/models/category.interface";
import {Subject} from "rxjs";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {map, takeUntil} from "rxjs/operators";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-organization-jobs-card-list',
  templateUrl: './organization-jobs-card-list.component.html',
  styleUrls: ['./organization-jobs-card-list.component.scss']
})
export class OrganizationJobsCardListComponent implements OnInit {

  selectedType: string;
  jobs: Job[];
  currentJobs: Job[];
  jobTypes: Type[];
  jobCategories: Category[];

  destroy$ = new Subject<boolean>();

  constructor(private jobsService: JobsService,
              private authenticationService: AuthenticationService,
              private router: Router) {
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
      for(let job of response[0]){
        if(job.organization === this.authenticationService.getLoggedUser().displayName){
          this.jobs.push(job);
          this.currentJobs.push(job);
        }
      }
      this.jobTypes = response[1];
      this.jobCategories = response[2];
    },(error => {
      console.log(error);
    }))
  }

  onRedirect(path: string): void{
    this.router.navigate([path]);
  }

}
