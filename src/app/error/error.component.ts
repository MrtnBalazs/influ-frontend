import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorMessage;

  constructor(private route: ActivatedRoute) {
    this.errorMessage = this.route.snapshot.paramMap.get('errorMessage');
  }

}
