
package com.praveen.elearing.Model;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "CourseTwo")
public class CourseTwo {
    private int _id;
    private int teacher_id;

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    private String course;
    private int duration;

    private String thumbnail;
    private byte[] thumbnaildata;

    public byte[] getThumbnaildata() {
        return thumbnaildata;
    }

    public void setThumbnaildata(byte[] thumbnaildata) {
        this.thumbnaildata = thumbnaildata;
    }

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

    @Override
    public String toString() {
        return "CourseTwo{" +
                "_id=" + _id +
                ", teacher_id=" + teacher_id +
                ", course='" + course + '\'' +
                ", duration=" + duration +
                ", thumbnail='" + thumbnail + '\'' +
                ", thumbnaildata=" + Arrays.toString(thumbnaildata) +
                '}';
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
