package com.example.lab_8.repository;

import com.example.lab_8.model.Profile;
import org.springframework.data.repository.CrudRepository;

import java.util.PrimitiveIterator;

public interface ProfileRepository extends CrudRepository<Profile, Long> {
    public Iterable<Profile> findAllByNameContaining(String string);
    public  Iterable<Profile> findAllByEmailContaining(String string);
    public Iterable<Profile> findAllByAgeBefore(int age);
}
