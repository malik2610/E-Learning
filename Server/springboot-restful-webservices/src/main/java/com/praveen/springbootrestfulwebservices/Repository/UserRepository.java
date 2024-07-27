package com.praveen.springbootrestfulwebservices.Repository;

import com.praveen.springbootrestfulwebservices.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
