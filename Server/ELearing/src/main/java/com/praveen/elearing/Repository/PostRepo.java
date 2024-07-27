package com.praveen.elearing.Repository;

import com.praveen.elearing.Model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends MongoRepository<Student,String> {

}
