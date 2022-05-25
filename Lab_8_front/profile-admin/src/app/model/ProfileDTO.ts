export class ProfileDTO {
  // id : number
  name : string;
  email : string;
  address : string;
  picture : string;
  age : number;
  town : string


  constructor(name: string, email: string, address: string, picture: string, age: number, town: string) {
    // this.id = id
    this.name = name;
    this.email = email;
    this.address = address;
    this.picture = picture;
    this.age = age;
    this.town = town;
  }
}
