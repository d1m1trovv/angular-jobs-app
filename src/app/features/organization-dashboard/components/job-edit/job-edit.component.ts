import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {Type} from "../../../../shared/components/jobs/models/type.interface";
import {Category} from "../../../../shared/components/jobs/models/category.interface";

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit, OnDestroy {

  job: Job;
  jobTypes: Type[];
  jobCategories: Category[];

  formGroup: FormGroup = this.formBuilder.group({});

  destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private jobsService: JobsService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.job = {
      title: '',
      organization: '',
      description: '',
      likes: 0,
      type: '',
      category: ''
    }

    this.jobTypes = [];
    this.jobCategories = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if (id) {
        this.getJob(id);
      }
    });

    this.getTypesAndCategories();

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void{
    const job: Job = {
      ...this.formGroup.value,
      organization: this.authenticationService.getLoggedUser().displayName,
      likes: this.job.likes
    };

    if(!job.id){
      this.jobsService.createJob({...job}).pipe(
        take(1)
      ).subscribe(() => {
        this.router.navigate(['organization/my-jobs'])
      }, (error) => {
        console.log(error);
        });

      return;
    }

    this.jobsService.updateJob(job).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['organization/my-jobs'])
    }, (error) => {
      console.log(error);
    });
  }

  private getJob(id: number): void{
    this.jobsService.getJobById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.job = response;

      this.buildForm();
    })
  }

  private getTypesAndCategories(): void{
    this.jobsService.getJobs().pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      for(let type of response[1]){
        if(type.name !== 'All'){
          this.jobTypes.push(type);
        }
      }
      for(let category of response[2]){
        if(category.name !== 'All'){
          this.jobCategories.push(category);
        }
      }
    })
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      id: this.job.id,
      title: [this.job.title, [Validators.required, Validators.minLength(5)]],
      description: [this.job.description, Validators.required],
      type: [this.job.type, [Validators.required]],
      category: [this.job.category, [Validators.required]]
    });
  }



}
