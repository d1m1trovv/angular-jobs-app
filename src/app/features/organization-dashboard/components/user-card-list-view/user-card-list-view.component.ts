import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../auth/models/user.interface";

@Component({
  selector: 'app-user-card-list-view',
  templateUrl: './user-card-list-view.component.html',
  styleUrls: ['./user-card-list-view.component.scss']
})
export class UserCardListViewComponent implements OnInit {

  @Input() users: User[]

  constructor() {
    this.users = []
  }

  ngOnInit(): void {
  }

}
