package com.praveen.elearing.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "VideoResource")
public class VideoResource {
    private int course_id;
    private int resource_id;
    private String video;
    private byte[] video_data;

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public int getResource_id() {
        return resource_id;
    }

    public void setResource_id(int resource_id) {
        this.resource_id = resource_id;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public byte[] getVideo_data() {
        return video_data;
    }

    @Override
    public String toString() {
        return "VideoResource{" +
                "course_id=" + course_id +
                ", resource_id=" + resource_id +
                ", video='" + video + '\'' +
                ", video_data=" + Arrays.toString(video_data) +
                '}';
    }

    public void setVideo_data(byte[] video_data) {
        this.video_data = video_data;
    }
}
