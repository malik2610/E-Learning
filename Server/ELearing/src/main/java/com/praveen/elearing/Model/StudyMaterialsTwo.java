package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StudyMaterialsTwo")
public class StudyMaterialsTwo {
    private int _id;
    private String course_name;
    private int teacher_id;
    private String pdf_file;
    private String thumbnail;

    private byte[] pdf_file_data;

    public byte[] getPdf_file_data() {
        return pdf_file_data;
    }

    public void setPdf_file_data(byte[] pdf_file_data) {
        this.pdf_file_data = pdf_file_data;
    }

    public byte[] getThumbnail_data() {
        return thumbnail_data;
    }

    public void setThumbnail_data(byte[] thumbnail_data) {
        this.thumbnail_data = thumbnail_data;
    }

    private byte[] thumbnail_data;

    @Override
    public String toString() {
        return "StudyMaterialsTwo{" +
                "_id=" + _id +
                ", course_name='" + course_name + '\'' +
                ", teacher_id=" + teacher_id +
                ", pdf_file='" + pdf_file + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                '}';
    }

    public String getPdf_file() {
        return pdf_file;
    }

    public void setPdf_file(String pdf_file) {
        this.pdf_file = pdf_file;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
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


}
