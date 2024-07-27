package com.praveen.elearing.Services;

import com.praveen.elearing.Model.Sequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class SequenceService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public long getNextSequenceValue(String sequenceName) {
        Sequence sequence = mongoTemplate.findAndModify(
                query(where("_id").is(sequenceName)),
                new Update().inc("sequence_value", 1),
                options().returnNew(true).upsert(true),
                Sequence.class
        );
        System.out.println(sequence);
        return sequence.getSequence_Value();
    }

}
