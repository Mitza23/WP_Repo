import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile";
import {ProfileService} from "../profile.service";

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

  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  onSelect(profile : Profile): void {
    this.selected = profile;
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

  addProfile(name : any, email : any, address : any, picture : any, age : any, town : any): void {
    this.profileService.addProfile(name.value, email.value, address.value, picture.value, age.value, town.value)
      .subscribe(
        response => {
          let r: any = response;
          this.errorMessage = r.result;
        }
      )
  }

  deleteProfile(id : number): void {
    this.profileService.deleteProfile(id)
      .subscribe(
        response => {
          let r: any = response;
          this.errorMessage = r.result;
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
      if(attribute === 'id') {
        this.filterQuery += " AND " + attribute + "=" + value;
      }
      else if (attribute === 'age') {
        this.filterQuery += " AND " + attribute + "<" + value;
      }
      else {
        this.filterQuery += " AND " + attribute + " LIKE \'%" + value + "%\'";
      }
      this.profileService.filterProfiles(this.filterQuery)
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
