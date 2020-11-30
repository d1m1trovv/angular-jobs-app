import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../auth/models/user.interface";
import {Job} from "../../../../shared/components/jobs/models/job.interface";

@Component({
  selector: 'app-user-card-list-view',
  templateUrl: './user-card-list-view.component.html',
  styleUrls: ['./user-card-list-view.component.scss']
})
export class UserCardListViewComponent implements OnInit {

  @Input() users: User[]
  @Input() job: Job;

  constructor() {
    this.users = []

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

}
