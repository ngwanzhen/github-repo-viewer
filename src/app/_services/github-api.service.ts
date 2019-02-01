import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Repo } from '../_models/repo';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private repoList = new BehaviorSubject<Repo[]>(undefined);
  currentRepoList = this.repoList.asObservable();
  private userList = new BehaviorSubject<Repo[]>(undefined);
  currentUserList = this.userList.asObservable();
  apiUrl = 'https://api.github.com';
  errMsg = {
    readmeErr: 'No readme found',
    repoSearchErr: 'Sorry, there were no repos found. Please try a valid github user.',
    rateExceeded: 'Sorry, github imposes a rate limit on the api. Please try again later.'
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async getRepoList(username) {
    try {
      const response = await this.http.get(`${this.apiUrl}/users/${username}/repos`).toPromise();
      if (!response) {
        throw this.errMsg.repoSearchErr;
      } else {
        const repoListArr = this._parseRepoDetails(response);
        this.repoList.next(repoListArr);
        return true;
      }
    } catch (error) {
      if (error) {
        if (error.status == 403) {
          throw this.errMsg.rateExceeded;
        } else {
          return await this.searchUser(username);
        }
      }
    }
  }

  async searchUser(username) {
    try {
      const response = await this.http.get(`${this.apiUrl}/search/users?q=${username}`).toPromise();
      if (!response) {
        throw this.errMsg.repoSearchErr;
      } else {
        if (!response['total_count']) {
          throw this.errMsg.repoSearchErr;
        } else {
          this.userList.next(response['items']);
          return { userList: response };
        }
      }
    } catch (error) {
      if (error) {
        throw this.errMsg.repoSearchErr;
      }
    }
  }

  _parseRepoDetails(input) {
    const repoNameList = input.map(e => {
      const obj = {
        name: e.name,
        updatedAt: e.updated_at
      };
      return obj;
    });
    return repoNameList;
  }

  async getReadMe(username, repoName) {
    try {
      const response = await this.http.get(`${this.apiUrl}/repos/${username}/${repoName}/readme`).toPromise();
      if (!response) {
        throw this.errMsg.readmeErr;
      } else {
        const markdown = await this._downloadReadMe(response['download_url']);
        return markdown;
      }
    } catch (error) {
      if (error) {
        throw this.errMsg.readmeErr;
      }
    }
  }

  async _downloadReadMe(url) {
    try {
      const response = await this.http.get(`${url}`, { responseType: 'text' }).toPromise();
      return response;
    } catch (error) {
      if (error) {
        throw error;
      }
    }
  }

  async clearRepoList() {
    this.repoList.next(null);
  }

}
