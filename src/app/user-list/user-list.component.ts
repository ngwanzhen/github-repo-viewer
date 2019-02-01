import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GithubApiService } from '../_services/github-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public userList: any[];
  @Input() username: string;
  @Output() foundUser = new EventEmitter<boolean>();
  err: string;
  private ngUnsubscribe: Subject<any> = new Subject();


  constructor(
    private githubApiService: GithubApiService
  ) { }

  ngOnInit() {
    this.githubApiService.currentUserList
      .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(userList => {
      this.userList = userList;
    });
  }

  getUserRepo(username) {
    this.githubApiService.getRepoList(username)
      .then(res => {
        this.foundUser.emit(username);
      })
      .catch(err => {
        this.err = err;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

