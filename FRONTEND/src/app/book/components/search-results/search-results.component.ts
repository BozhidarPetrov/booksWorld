import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  searchText: string | null = '';

  ngOnInit(): void {
    this.searchText = this.activatedRoute.snapshot.queryParams['searchText'];
    console.log(this.searchText);
  }
}
