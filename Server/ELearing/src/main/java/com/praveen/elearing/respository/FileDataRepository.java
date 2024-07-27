package com.praveen.elearing.respository;

import com.praveen.elearing.entity.FileData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileDataRepository extends MongoRepository<FileData, Integer> {
    List<FileData> findByName(String fileName);
}
