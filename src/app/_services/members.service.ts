import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

const storageData = JSON.parse(localStorage.getItem("users") || "{}");
const token = storageData['token'] ? storageData['token'] || null;

const httpOptions = {
  headers: new HttpHeaders({
    token: token ? token : ""
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + "users", httpOptions);
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + `user/${username}`, httpOptions);
  }
}
