import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile";
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles : Profile[] = [];

  selected? : Profile;

  errorMessage : string = "";

  filterQuery : string = "";

  constructor(private profileService : ProfileService, private router : Router) { }

  ngOnInit(): void {
    this.checkLogin();
    this.getProfiles();
  }

  checkLogin(){
    if(sessionStorage.getItem("currentUserId") == null){
      this.router.navigate(['/login']);
    }

  }

  onSelect(profile : Profile): void {
    console.log(profile.id + " " + sessionStorage.getItem("currentUserId"))
    // @ts-ignore
    if(profile.id == parseInt(sessionStorage.getItem("currentUserId"))) {
      this.selected = profile;
    }
    else {
      alert("Not yours :P");
    }
  }

  getProfiles(): void {
    console.log("Getting all");
    this.profileService.getProfiles()
      .subscribe(
        profiles => {
          this.profiles = profiles
        }
      );
  }

  // addProfile(name : any, email : any, address : any, picture : any, age : any, town : any): void {
  //   this.profileService.addProfile(name.value, email.value, address.value, picture.value, age.value, town.value)
  //     .subscribe(
  //       response => {
  //         let r: any = response;
  //         this.errorMessage = r.result;
  //       }
  //     )
  // }

  deleteProfile(id : number): void {
    this.profileService.deleteProfile(id)
      .subscribe(
        response => {
          console.log("Success")
        }, () => {
          console.log("Error")
        }
      )
  }

  updateProfile(profile : Profile): void {
    this.profileService.updateProfile(profile)
      .subscribe(
        response => {
          let r: any = response;
          this.errorMessage = r.result;
        }
      )
  }

  filter(attribute : any, value : any): void {

    attribute = String(attribute.value).trim();
    value = String(value.value).trim();

    console.log(attribute)
    const attributes = ["id", "name", "email", "address", "picture", "age", "town"]
    if(attributes.includes(attribute)) {
      // if(attribute === 'id') {
      //   this.filterQuery += " AND " + attribute + "=" + value;
      // }
      // else if (attribute === 'age') {
      //   this.filterQuery += " AND " + attribute + "<" + value;
      // }
      // else {
      //   this.filterQuery += " AND " + attribute + " LIKE \'%" + value + "%\'";
      // }
      this.profileService.filterProfiles(attribute, value)
        .subscribe(profiles => this.profiles = profiles);
    }
    else {
      alert("Invalid attribute");
    }
  }

  resetFilter(): void {
    this.filterQuery = "";
    this.profileService.resetFilter();
    this.getProfiles();
  }

}
