import { Component, OnInit } from '@angular/core';
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {Type} from "../../../../shared/components/jobs/models/type.interface";
import {Category} from "../../../../shared/components/jobs/models/category.interface";
import {Subject} from "rxjs";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {map, takeUntil} from "rxjs/operators";
import {Application} from "../../../../shared/components/jobs/models/application.interface";
import {AuthenticationService} from "../../../../auth/services/authentication.service";

@Component({
  selector: 'app-application-card-list',
  templateUrl: './application-card-list.component.html',
  styleUrls: ['./application-card-list.component.scss']
})
export class ApplicationCardListComponent implements OnInit {

  selectedType: string;
  jobs: Job[];
  currentJobs: Job[];
  jobTypes: Type[];
  jobCategories: Category[];

  applicationIds: number[];

  destroy$ = new Subject<boolean>();

  constructor(private jobsService: JobsService,
              private authenticationService: AuthenticationService) {
    this.jobs = [];
    this.currentJobs = [];
    this.jobTypes = [];
    this.jobCategories = [];
    this.selectedType = "";
    this.applicationIds = [];
  }

  ngOnInit(): void {
    this.getApplicationsIds(this.getAuthenticatedUserId());
    this.getApplications();
  }

  private getAuthenticatedUserId(): number{
    return this.authenticationService.getLoggedUser().id!;
  }

  private getApplicationsIds(id: number): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.filter(application => application.user_id === id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      for(let app of response){
        if (app.job_id != null) {
          this.applicationIds.push(app.job_id);
        }
      }
    },(error => {
      console.log(error);
    }))
  }

  private getApplications(): void{
    this.jobsService.getJobs().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      for(let id of this.applicationIds){
        for(let job of response[0]){
          if(job.id === id){
            this.jobs.push(job);
            this.currentJobs.push(job);
          }
        }
      }
      this.jobTypes = response[1];
      this.jobCategories = response[2];
    })
  }

}
