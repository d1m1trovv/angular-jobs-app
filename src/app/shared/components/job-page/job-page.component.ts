import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, take, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {JobsService} from "../jobs/services/jobs.service";
import {Job} from "../jobs/models/job.interface";
import {Application} from "../jobs/models/application.interface";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {Like} from "../jobs/models/like.interface";

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit, OnDestroy {

  job: Job;
  currentUserId: number = 0;
  jobLikes: Like[];
  app: Application;

  hasUserApplied: boolean = false;
  hasUserLiked: boolean = false;
  isUserStandard: boolean = false;
  isJobOwner: boolean = false;

  hasUserApplied$ = new BehaviorSubject<boolean>(false);
  hasUserLiked$ = new BehaviorSubject<boolean>(false);
  isJobOwner$ = new BehaviorSubject<boolean>(false);
  destroy$ = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private jobsService: JobsService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.job = {
      title: '',
      description: '',
      organization: '',
      likes: 0,
      type: '',
      category: ''
    }

    this.app = {};

    this.jobLikes = [];
  }

  ngOnInit(): void {
    this.currentUserId = this.authenticationService.getLoggedUser().id!;

    this.authenticationService.getIsUserStandard().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isStandard => this.isUserStandard = isStandard);

    console.log('Is standard: ' + this.isUserStandard);

    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if(id){
        this.getJob(id);
        this.getJobLikes();
        this.getIsUserApplied();
        this.getApplication();
      }
    })

    this.getHasUserApplied().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasApplied => this.hasUserApplied = hasApplied);

    this.getHasUserLiked().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLiked => this.hasUserLiked = hasLiked);

    this.getIsJobOwner().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isOwner => this.isJobOwner = isOwner);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onViewApplicants(): void{
    this.router.navigate(['/organization', 'applicants', 'jobs', this.job.id])
  }

  private getJob(id: number): void{
    this.jobsService.getJobById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.job = response;

      this.getIsJobOwner();
    })
  }

  private getApplication(): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.find(tempApp => tempApp.user_id === this.currentUserId
      && tempApp.job_id === this.job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        this.app = response;
      }
    }, (error) => {
      console.log(error);
    })
  }

  onApply(): void {
    const app: Application = {
      user_id: this.currentUserId,
      job_id: this.job.id
    }

    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.find(tempApp => tempApp.job_id === this.job.id
      && tempApp.user_id === this.currentUserId)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){

        return;
      }
    })

    this.jobsService.createApplication(app).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getIsUserApplied();

      this.setHasUserApplied(true);
    }, (error) => {
      console.log(error);
    })
  }

  onUnApply(): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.find(tempApp => tempApp.user_id === this.currentUserId
      && tempApp.job_id === this.job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        this.deleteApplication(response);

        this.setHasUserApplied(false);
      }
    })
  }

  deleteApplication(app: Application): void{
    this.jobsService.deleteApplication(app.id!).pipe(
      take(1)
    ).subscribe(() => {
      this.getIsUserApplied();
    })
  }

  getIsUserApplied(): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.find(tempApp => tempApp.job_id === this.job.id
      && tempApp.user_id === this.currentUserId)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        this.setHasUserApplied(true);
      }
    }, (error) => {
      console.log(error);
    })
  }

  onLike(): void{
    const like: Like = {
      job_id: this.job.id,
      user_id: this.currentUserId
    }

    this.jobsService.getLikes().pipe(
      map((stream: Like[]) => stream.find(tempLike => tempLike.job_id === like.job_id
        && tempLike.user_id === like.user_id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){

        return;
      }
    })

    this.jobsService.createLike(like).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getJobLikes();

      this.setHasUserLiked(true);
    }, (error) => {
      console.log(error);
    })
  }

  onUnLike(): void{
    this.jobsService.getLikes().pipe(
      map((stream: Like[]) => stream.find(like => like.user_id === this.currentUserId
        && like.job_id === this.job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        this.deleteLike(response);

        this.setHasUserLiked(false);
      }
    }, (error) => {
      console.log(error);
    })
  }

  private deleteLike(like: Like): void{
    this.jobsService.deleteLike(like.id!).pipe(
      take(1)
    ).subscribe(() => {
      this.getJobLikes();
    })
  }

  private getJobLikes(): void{
    console.log(this.job.id);
    this.jobsService.getLikes().pipe(
      map((stream: Like[]) => stream.filter(tempLike => tempLike.job_id === this.job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.jobLikes = response;
      console.log(response);
      for(let like of response){
        if(like.user_id === this.currentUserId){
          this.setHasUserLiked(true);
        }
      }
    }, (error) => {
      console.log(error);
    })
  }

  checkIfUserApplied(): void{
    this.setHasUserApplied(false);
    this.jobsService.getApplications().pipe(
      map((stream) => stream.find(app =>
        app.user_id === this.currentUserId &&
        app.job_id === this.job.id)),
      take(1)).subscribe((response) =>{
        if(response){
          this.setHasUserApplied(true);
        }
    })
  }

  checkIfJobOwner(): void{
    if(this.job.organization === this.authenticationService.getLoggedUser().displayName){
      this.setIsJobOwner(true);
      console.log(this.job.organization);
      console.log(this.authenticationService.getLoggedUser().displayName)
      return;
    }

    this.setIsJobOwner(false);
  }

  setHasUserApplied(hasApplied: boolean): void{
    this.hasUserApplied$.next(hasApplied);
  }

  getHasUserApplied(): Observable<boolean>{
    return this.hasUserApplied$.asObservable();
  }

  setIsJobOwner(isOwner: boolean): void{
    this.isJobOwner$.next(isOwner);
  }

  getIsJobOwner(): Observable<boolean>{
    this.checkIfJobOwner();
    return this.isJobOwner$.asObservable();
  }

  setHasUserLiked(hasApplied: boolean){
    this.hasUserLiked$.next(hasApplied);
  }

  getHasUserLiked(): Observable<boolean>{
    return this.hasUserLiked$.asObservable();
  }

  onRedirect(path: string): void{
    this.router.navigate([path]);
  }

  onDelete(id: number): void{
    this.jobsService.deleteJob(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['organization/my-jobs'])
    }, (error) => {
      console.log(error);
    });
  }

}
