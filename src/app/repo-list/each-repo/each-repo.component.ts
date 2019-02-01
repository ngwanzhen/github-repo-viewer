import { Component, OnInit, Input } from '@angular/core';
import { GithubApiService } from '../../_services/github-api.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-each-repo',
  templateUrl: './each-repo.component.html',
  styleUrls: ['./each-repo.component.scss']
})
export class EachRepoComponent implements OnInit {

  @Input() repoName: string;
  @Input() repoDate: string;
  @Input() username: string;
  public readme: string;
  public showReadme: Boolean;
  public err: string;

  constructor(
    private githubApiService: GithubApiService
  ) { }

  ngOnInit() {
    // ! THIS HAS FASTER LOADING FOR UX, BUT GITHUB RATE LIMITS THIS
    // this.githubApiService.getReadMe(this.username, this.repoName)
    // .then(res => {
    //   this.readme = res;
    // })
    // .catch(err => {
    //   this.err = err;
    // });
  }

  toggleReadme() {
    this.githubApiService.getReadMe(this.username, this.repoName)
      .then(res => {
        this.readme = res;
      })
      .catch(err => {
        this.err = err;
      });
    this.showReadme ? this.showReadme = false : this.showReadme = true;
  }

}
