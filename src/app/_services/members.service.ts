import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(
      map(members => {
        this.members = members;
        return members
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(member => member.username === username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }

  update(member: Member){
    return this.http.put(this.baseUrl + "users",member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
  setMainPhoto(photoId: Number){
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photoId}`, {});
  }
  deletePhoto(photoId: Number){
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }
}
