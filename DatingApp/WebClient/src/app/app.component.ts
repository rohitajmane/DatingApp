import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Learning Angular + .Net + SQL';
  users: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    var url = "https://localhost:5001/api/users";

    this.http.get(url).subscribe({
      next: result => { this.users = result; },
      error: error => { console.log(error); }
    })

  }
}
