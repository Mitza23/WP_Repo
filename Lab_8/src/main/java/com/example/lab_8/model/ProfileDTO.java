package com.example.lab_8.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileDTO {

    private String name;
    private String email;
    private String address;
    private String picture;
    private int age;
    private String town;

    public ProfileDTO(Profile profile) {
        this.name = profile.getName();
        this.email = profile.getEmail();
        this.address = profile.getAddress();
        this.picture = profile.getPicture();
        this.age = profile.getAge();
        this.town = profile.getTown();
    }
}
