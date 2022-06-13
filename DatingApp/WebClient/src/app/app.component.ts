import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Test Content';
  users: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    var url = 'https://localhost:5001/api/Users';
    var response = this.http.get(url);

    response.subscribe({
      next: res => { this.users = res; },
      error: error => { console.error(error); }
    });
  }

}
