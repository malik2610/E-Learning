package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Enroll")
public class Enroll {
    private int _id;

    @Override
    public String toString() {
        return "Enroll{" +
                "_id=" + _id +
                ", student_id=" + student_id +
                ", course_id=" + course_id +
                '}';
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    private int student_id;
    private int course_id;

}
