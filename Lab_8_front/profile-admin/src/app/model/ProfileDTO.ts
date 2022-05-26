export class ProfileDTO {
  username : string;
  password : string;
  name : string;
  email : string;
  address : string;
  picture : string;
  age : number;
  town : string


  constructor(username : string, password : string, name: string, email: string, address: string, picture: string, age: number, town: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.address = address;
    this.picture = picture;
    this.age = age;
    this.town = town;
  }
}
