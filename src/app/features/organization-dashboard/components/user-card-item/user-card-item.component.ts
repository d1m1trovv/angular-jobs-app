import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../auth/models/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card-item',
  templateUrl: './user-card-item.component.html',
  styleUrls: ['./user-card-item.component.scss']
})
export class UserCardItemComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router) {
    this.user = {
      displayName: '',
      username: '',
      email: ''
    }
  }

  ngOnInit(): void {
  }

}
