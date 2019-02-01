import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GithubApiService } from '../_services/github-api.service';
import { Repo } from '../_models/repo';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {

  public repoList: Repo[];
  @Input() username: string;
  private ngUnsubscribe: Subject<any> = new Subject();


  constructor(
    private githubApiService: GithubApiService,
  ) { }

  ngOnInit() {
    this.githubApiService.currentRepoList
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(repoList => {
      this.repoList = repoList;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
