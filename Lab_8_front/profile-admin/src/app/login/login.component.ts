import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  addProfile(username : any, password : any, name : any, email : any, address : any, picture : any, age : any,
             town : any){
    let id : number = 0;
    this.loginService.addProfile(username.value, password.value, name.value, email.value, address.value, picture.value,
      age.value, town.value)
      .subscribe(_id => id = _id);
    sessionStorage.setItem('currentUserId', id+'');
    this.router.navigate(['../profiles'])
  }

  checkProfile(username : any, password : any) {
    console.log(username.value + " " + password.value)
    if(username.value != "" && password.value != "")
    {
      let id: number = 0;
      this.loginService.checkProfile(username.value, password.value).subscribe(
        _id => {
          id = _id;
          console.log("ID: " + id);
          sessionStorage.setItem('currentUserId', id+'');
          this.router.navigate(['../profiles'])
          console.log("sessionId: " + sessionStorage.getItem("currentUserId"))
        },
      error => {
          alert("Wrong credentials");
      });
    }
    else {
      alert("Username and password must not be empty");
    }
  }

}
