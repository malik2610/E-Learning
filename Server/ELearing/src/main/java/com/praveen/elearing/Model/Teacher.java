package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Teacher")
public class Teacher {
    private int _id;
    private String password;
    private String name;
    private String education;
    private String university;
    private String phone;
    private String state;

    @Override
    public String toString() {
        return "Teacher{" +
                "_id=" + _id +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", education='" + education + '\'' +
                ", university='" + university + '\'' +
                ", phone='" + phone + '\'' +
                ", state='" + state + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;
}
