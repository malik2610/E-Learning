package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "Course")
public class Course {
    private int _id;
    private int teacher_id;

    @Override
    public String toString() {
        return "Course{" +
                "_id=" + _id +
                ", teacher_id=" + teacher_id +
                ", course='" + course + '\'' +
                ", duration=" + duration +
                ", thumbnail=" + Arrays.toString(thumbnail) +
                '}';
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    private String course;
    private int duration;

    private byte[] thumbnail;

    public int getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(int teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public byte[] getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(byte[] thumbnail) {
        this.thumbnail = thumbnail;
    }
}
