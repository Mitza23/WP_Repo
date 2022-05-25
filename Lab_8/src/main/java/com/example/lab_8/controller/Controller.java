package com.example.lab_8.controller;

import com.example.lab_8.model.Profile;
import com.example.lab_8.model.ProfileDTO;
import com.example.lab_8.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
@RestController
@RequestMapping("/profile")
public class Controller {
    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping(path = "/add")
    public String addProfile(@RequestBody ProfileDTO profileDTO){
        Profile p = new Profile(profileDTO);
        profileRepository.save(p);
        return "Saved";
    }

    @PutMapping(path = "/update")
    public String updateProfile(@RequestBody Profile profile) {
        profileRepository.save(profile);
        return "Updated";
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteProfile(@PathVariable Long id){
        profileRepository.deleteById(id);
        return "Deleted";
    }

    @GetMapping(path = "/all")
    public Iterable<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    @GetMapping(path = "/filter")
    public Iterable<Profile> filterProfiles(@RequestParam String attribute, @RequestParam String value) {
        if (Objects.equals(attribute, "name")){
            return profileRepository.findAllByNameContaining(value);
        }
        else if(Objects.equals(attribute, "email")) {
            return profileRepository.findAllByEmailContaining(value);
        }
        else if(Objects.equals(attribute, "age")) {
            return profileRepository.findAllByAgeBefore(Integer.parseInt(value));
        }
        return null;
    }

    @PutMapping(path = "/resetFilter")
    public void resetFilter() {
        ;
    }
}
