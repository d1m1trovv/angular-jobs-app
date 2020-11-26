import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.interface";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {User} from "../../../../auth/models/user.interface";
import {Application} from "../models/application.interface";
import {JobsService} from "../services/jobs.service";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-job-card-item',
  templateUrl: './job-card-item.component.html',
  styleUrls: ['./job-card-item.component.scss']
})
export class JobCardItemComponent implements OnInit {

  @Input() job: Job;

  constructor(private authenticationService: AuthenticationService,
              private jobsService: JobsService,
              private router: Router) {
    this.job = {
      title: '',
      description: '',
      organization: '',
      likes: 0,
      type: '',
      category: ''
    }
  }

  ngOnInit(): void {
  }

  onReadMoreClick(): void{
    this.router.navigate(['/main', 'jobs', this.job.id])
  }
}
