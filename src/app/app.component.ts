import { Component, OnInit } from '@angular/core';
import { GithubApiService } from './_services/github-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'gh-app';
  username: String;
  err: String;
  foundUser: boolean;

  constructor(
    private githubApiService: GithubApiService,
  ) { }

  ngOnInit() { }

  async submitForm(input) {
    this.err = null;
    this.githubApiService.clearRepoList();
    this.githubApiService.getRepoList(input)
    .then(res => {
      if (res['userList']) {
        this.foundUser = false;
      } else { this.foundUser = true; }
    })
    .catch(err => {
      this.err = err;
    });
    this.username = input;
  }

  getRepoFor(input) {
    this.username = input;
    this.foundUser = true;
  }
}
