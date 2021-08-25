import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any;
  constructor(private accountService: AccountService){}
  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser(){
    // const tempUser: string | null = localStorage.getItem('user');
    // const user: User = JSON.parse(tempUser ? tempUser : "")
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrenUser(user);
  }
}
