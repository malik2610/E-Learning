package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "StudyMaterials")
public class StudyMaterials {
    private int _id;
    private String course_name;
    private int teacher_id;
    private byte[] pdf_file;
    private byte[] thumbnail;

    @Override
    public String toString() {
        return "StudyMaterials{" +
                "_id=" + _id +
                ", course_name='" + course_name + '\'' +
                ", teacher_id=" + teacher_id +
                ", pdf_file=" + Arrays.toString(pdf_file) +
                ", thumbnail=" + Arrays.toString(thumbnail) +
                '}';
    }

    public byte[] getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(byte[] thumbnail) {
        this.thumbnail = thumbnail;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public int getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(int teacher_id) {
        this.teacher_id = teacher_id;
    }

    public byte[] getPdf_file() {
        return pdf_file;
    }

    public void setPdf_file(byte[] pdf_file) {
        this.pdf_file = pdf_file;
    }
}
