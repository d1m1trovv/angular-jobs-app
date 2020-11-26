import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Type} from "../models/type.interface";
import {Category} from "../models/category.interface";

@Component({
  selector: 'app-filter-buttons-section',
  templateUrl: './filter-buttons-section.component.html',
  styleUrls: ['./filter-buttons-section.component.scss']
})
export class FilterButtonsSectionComponent implements OnInit {

  @Input() jobTypes: Type[] = [];
  @Input() jobCategories: Category[] = [];

  @Output() typeSelected = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
