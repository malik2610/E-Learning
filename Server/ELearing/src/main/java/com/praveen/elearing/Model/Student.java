package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Student")
public class Student {
    private int _id;

    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public int get_id() {
        return _id;
    }

    private String name;
    private String education;
    private String university;
    private String email;
    private String phone;
    private String state;

    @Override
    public String toString() {
        return "Student{" +
                "_id=" + _id +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", education='" + education + '\'' +
                ", university='" + university + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", state='" + state + '\'' +
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEducation() {
        return education;
    }

    public String getUniversity() {
        return university;
    }

    public String getEmail() {
        return email;
    }


}
