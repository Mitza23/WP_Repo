package com.example.lab_8.model;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String name;
    private String email;
    private String address;
    private String picture;
    private int age;
    private String town;

    public Profile(ProfileDTO profile) {
        this.username = profile.getUsername();
        this.password = profile.getPassword();
        this.name = profile.getName();
        this.email = profile.getEmail();
        this.address = profile.getAddress();
        this.picture = profile.getPicture();
        this.age = profile.getAge();
        this.town = profile.getTown();
    }
}
