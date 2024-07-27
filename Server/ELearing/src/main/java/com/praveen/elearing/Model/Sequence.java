package com.praveen.elearing.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Sequence")
public class Sequence {
    @Id
    private String _id;
    private long sequence_value;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public long getSequence_Value() {
        return sequence_value;
    }

    public void setSequence_Value(long sequence_Value) {
        this.sequence_value = sequence_Value;
    }

    @Override
    public String toString() {
        return "Sequence{" +
                "_id='" + _id + '\'' +
                ", sequence_Value=" + sequence_value +
                '}';
    }

}