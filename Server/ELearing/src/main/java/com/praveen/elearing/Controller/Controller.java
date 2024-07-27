package com.praveen.elearing.Controller;


import com.praveen.elearing.Model.*;
import com.praveen.elearing.Repository.PostRepo;
import com.praveen.elearing.Services.SequenceService;
import com.praveen.elearing.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


@RestController
public class Controller {

    @Autowired
    PostRepo repo;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    private SequenceService sequenceService;

    @Autowired
    private StorageService service;

    private int UserId;

    @PostMapping("/Sregister")
    public ResponseEntity<Student> studentRegister(@RequestBody Student s) {

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(s.getEmail()));
        Student existingStudent = mongoTemplate.findOne(query, Student.class);
        if (existingStudent != null) {
            return new ResponseEntity("No", HttpStatus.OK);
        }

        long newId = sequenceService.getNextSequenceValue("student");
        s.set_id((int)newId);
        s.setPassword(s.getName()+"123");
        s.setState("");
        s.setPhone("");
        mongoTemplate.save(s);
        return new ResponseEntity("Yes", HttpStatus.OK);
    }

    @PostMapping("Slogin")
    public ResponseEntity<Student> StudentLogin(@RequestBody Student s){
        Query query=new Query();
        query.addCriteria(Criteria.where("name").is(s.getName()).and("password").is(s.getPassword()));
        Student existingStudent=mongoTemplate.findOne(query,Student.class);
        if(existingStudent!=null){
            UserId=existingStudent.get_id();
            System.out.println(UserId);
            return new ResponseEntity("Yes", HttpStatus.OK);
        }
        else{
            return new ResponseEntity("No", HttpStatus.OK);
        }
    }

    @PostMapping("Tlogin")
    public ResponseEntity<Teacher> TeacherLogin(@RequestBody Teacher s){
        Query query=new Query();
        query.addCriteria(Criteria.where("name").is(s.getName()).and("password").is(s.getPassword()));
        Teacher existingTeacher=mongoTemplate.findOne(query, Teacher.class);
        if(existingTeacher!=null){
            UserId=existingTeacher.get_id();
            System.out.println(UserId);
            return new ResponseEntity("Yes", HttpStatus.OK);
        }
        else{
            return new ResponseEntity("No", HttpStatus.OK);
        }
    }

    @GetMapping("StudentProfile")
    public ResponseEntity<Student> StudentProfile(){
        Query query=new Query();
        query.addCriteria(Criteria.where("_id").is(UserId));
        Student s=mongoTemplate.findOne(query,Student.class);
        return new ResponseEntity(s, HttpStatus.OK);
    }

    @GetMapping("TeacherProfile")
    public ResponseEntity<Teacher> TeacherProfile(){
        Query query=new Query();
        query.addCriteria(Criteria.where("_id").is(UserId));
        Teacher s=mongoTemplate.findOne(query,Teacher.class);
        return new ResponseEntity(s, HttpStatus.OK);
    }

    @PostMapping("StudentProfile")
    public ResponseEntity<Student> StudentProfile(@RequestBody Student s){
        Query query=new Query();
        query.addCriteria(Criteria.where("_id").is(UserId));
        Update update=new Update()
                .set("name", s.getName())
                .set("email", s.getEmail())
                .set("phone", s.getPhone())
                .set("education", s.getEducation())
                .set("university", s.getUniversity())
                .set("state",s.getState());
        mongoTemplate.updateFirst(query, update, Student.class);
        mongoTemplate.save(s);
        return new ResponseEntity("Yes", HttpStatus.OK);
    }

    @PostMapping("TeacherProfile")
    public ResponseEntity<Teacher> TeacherProfile(@RequestBody Teacher s){
        Query query=new Query();
        query.addCriteria(Criteria.where("_id").is(UserId));
        Update update=new Update()
                .set("name", s.getName())
                .set("email", s.getEmail())
                .set("phone", s.getPhone())
                .set("education", s.getEducation())
                .set("university", s.getUniversity())
                .set("state",s.getState());
        mongoTemplate.updateFirst(query, update, Teacher.class);
        mongoTemplate.save(s);
        return new ResponseEntity("Yes", HttpStatus.OK);
    }

//        @PostMapping("/AddCourse")
//        public ResponseEntity<String> addCourse(@RequestParam("thumbnail") MultipartFile file,
//                                                @RequestParam("course") String course,
//                                                @RequestParam("duration") String duration) throws IOException {
//            long newId = sequenceService.getNextSequenceValue("Course");
//            Course s = new Course();
//            s.set_id((int) newId);
//            s.setTeacher_id(UserId);
//            s.setCourse(course);
//            s.setDuration(Integer.parseInt(duration));
//            System.out.println(file);
//            s.setThumbnail(file.getBytes());
//            mongoTemplate.save(s);
//            return new ResponseEntity<>("Yes", HttpStatus.OK);
//        }

//        @GetMapping("/TeacherCourses")
//        public ResponseEntity<List<Course>> teacherCourses() {
//            Query query = new Query();
//            query.addCriteria(Criteria.where("teacher_id").is(UserId));
//            List<Course> courses = mongoTemplate.find(query, Course.class);
//            return new ResponseEntity<>(courses, HttpStatus.OK);
//        }

    @GetMapping("/AllCoursesWithTeachers")
    public ResponseEntity<List<Map<String, Object>>> allCoursesWithTeachers() {

        List<Course> courses = mongoTemplate.findAll(Course.class);


        List<Map<String, Object>> coursesWithTeacher = courses.stream()
                .map(course -> {
                    Query query = new Query();
                    query.addCriteria(Criteria.where("_id").is(course.getTeacher_id()));
                    Teacher teacher = mongoTemplate.findOne(query, Teacher.class);
                    Map<String, Object> courseWithTeacher = new HashMap<>();
                    courseWithTeacher.put("course_id", course.get_id());
                    courseWithTeacher.put("courseName", course.getCourse());
                    courseWithTeacher.put("duration", course.getDuration());
                    courseWithTeacher.put("thumbnail", course.getThumbnail());
                    courseWithTeacher.put("teacherName", teacher != null ? teacher.getName() : "Unknown");

                    return courseWithTeacher;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(coursesWithTeacher, HttpStatus.OK);
    }


    @PostMapping("/EnrollCourse")
    public ResponseEntity<Enroll> EnrollCourse(@RequestBody Enroll s) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(UserId).and("course_id").is(s.getCourse_id()));
        Enroll existingCourse = mongoTemplate.findOne(query, Enroll.class);
        if (existingCourse != null) {
            return new ResponseEntity("No", HttpStatus.OK);
        }
        long newId = sequenceService.getNextSequenceValue("Enroll");
        s.set_id((int)newId);
        s.setStudent_id(UserId);
        s.setCourse_id(s.getCourse_id());
        mongoTemplate.save(s);
        return new ResponseEntity("Yes", HttpStatus.OK);
    }

    @GetMapping("/EnrolledCourses")
    public ResponseEntity<List<Map<String, Object>>> enrolledCourses() {
        int studentId = UserId;
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId));
        List<Enroll> enrolledCourses = mongoTemplate.find(query, Enroll.class);
        List<Map<String, Object>> courses = enrolledCourses.stream()
                .map(enroll -> {
                    Query courseQuery = new Query();
                    courseQuery.addCriteria(Criteria.where("_id").is(enroll.getCourse_id()));
                    Course course = mongoTemplate.findOne(courseQuery, Course.class);
                    if (course != null) {
                        Map<String, Object> courseDetails = new HashMap<>();
                        courseDetails.put("course_id", course.get_id());
                        courseDetails.put("courseName", course.getCourse());
                        courseDetails.put("duration", course.getDuration());
                        courseDetails.put("thumbnail", course.getThumbnail());
                        return courseDetails;
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }


    @GetMapping("/StudentsEnrolledByTeacher")
    public ResponseEntity<List<Map<String, Object>>> studentsEnrolledByTeacher() {
        int teacherId = UserId;
        // Find all courses taught by the teacher
        Query courseQuery = new Query();
        courseQuery.addCriteria(Criteria.where("teacher_id").is(teacherId));
        List<Course> courses = mongoTemplate.find(courseQuery, Course.class);
        // Store student IDs to avoid duplicates
        Set<Integer> studentIds = new HashSet<>();
        // Find students enrolled in each course
        courses.forEach(course -> {
            Query enrollQuery = new Query();
            enrollQuery.addCriteria(Criteria.where("course_id").is(course.get_id()));
            List<Enroll> enrollments = mongoTemplate.find(enrollQuery, Enroll.class);
            enrollments.forEach(enrollment -> studentIds.add(enrollment.getStudent_id()));
        });
        // Find student details using the collected student IDs
        Query studentQuery = new Query();
        studentQuery.addCriteria(Criteria.where("_id").in(studentIds));
        List<Student> students = mongoTemplate.find(studentQuery, Student.class);
        // Prepare response
        List<Map<String, Object>> studentDetails = students.stream()
                .map(student -> {
                    Map<String, Object> studentInfo = new HashMap<>();
                    studentInfo.put("studentId", student.get_id());
                    studentInfo.put("name", student.getName());
                    studentInfo.put("phone", student.getPhone());
                    studentInfo.put("email", student.getEmail());
                    return studentInfo;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(studentDetails, HttpStatus.OK);
    }


    @PostMapping("/AddStudyMaterials")
    public ResponseEntity<String> addCourseMaterial(@RequestParam("pdf_file") MultipartFile file,
                                                    @RequestParam("thumbnail") MultipartFile file1,
                                            @RequestParam("course_name") String course
                                            ) throws IOException {
        long newId = sequenceService.getNextSequenceValue("StudyMaterials");
        StudyMaterials s = new StudyMaterials();
        s.set_id((int) newId);
        s.setCourse_name(course);
        s.setTeacher_id((UserId));
        s.setPdf_file(file.getBytes());
        s.setThumbnail(file1.getBytes());
        mongoTemplate.save(s);
        return new ResponseEntity<>("Yes", HttpStatus.OK);
    }

    @GetMapping("/TeacherStudyMaterials")
    public ResponseEntity<List<StudyMaterials>> StudyMaterials() {

        Query query = new Query();
        query.addCriteria(Criteria.where("teacher_id").is(UserId));
        List<StudyMaterials> studyMaterials = mongoTemplate.find(query, StudyMaterials.class);
        return new ResponseEntity<>(studyMaterials, HttpStatus.OK);
    }
    @GetMapping("/enrolled-study-materials")
    public ResponseEntity<List<StudyMaterials>> getEnrolledStudyMaterials() {
        int studentId = UserId;

        // Find courses the student is enrolled in
        Query enrollQuery = new Query();
        enrollQuery.addCriteria(Criteria.where("student_id").is(studentId));
        List<Enroll> enrolledCourses = mongoTemplate.find(enrollQuery, Enroll.class);

        // Find study materials uploaded by teachers of those courses
        Set<Integer> teacherIds = new HashSet<>();
        for (Enroll enroll : enrolledCourses) {
            Query courseQuery = new Query();
            courseQuery.addCriteria(Criteria.where("_id").is(enroll.getCourse_id()));
            Course course = mongoTemplate.findOne(courseQuery, Course.class);
            if (course != null) {
                teacherIds.add(course.getTeacher_id());
            }
        }

        // Retrieve study materials
        Query studyMaterialQuery = new Query();
        studyMaterialQuery.addCriteria(Criteria.where("teacher_id").in(teacherIds));
        List<StudyMaterials> studyMaterials = mongoTemplate.find(studyMaterialQuery, StudyMaterials.class);

        return new ResponseEntity<>(studyMaterials, HttpStatus.OK);
    }


    @PostMapping("/AddCourseFileSystem")
    public ResponseEntity<String> AddCourseFileSystem(@RequestParam("thumbnail") MultipartFile file,
                                            @RequestParam("course") String course,
                                            @RequestParam("duration") String duration) throws IOException {
        long newId = sequenceService.getNextSequenceValue("CourseTwo");
        CourseTwo s = new CourseTwo();
        s.set_id((int) newId);
        s.setTeacher_id(UserId);
        s.setCourse(course);
        s.setDuration(Integer.parseInt(duration));
        System.out.println(file);
        String uploadImage = service.uploadImageToFileSystem(file);
        s.setThumbnail(uploadImage);
        mongoTemplate.save(s);
        return new ResponseEntity<>("Yes", HttpStatus.OK);
    }


    @GetMapping("/TeacherCoursesFileSystem")
    public ResponseEntity<List<CourseTwo>> TeacherCoursesFileSystem() throws IOException {
        Query query = new Query();
        query.addCriteria(Criteria.where("teacher_id").is(UserId)); // Change the value as needed
        List<CourseTwo> courses = mongoTemplate.find(query, CourseTwo.class);
        for (CourseTwo course : courses) {
            String fileName = course.getThumbnail();
            System.out.println(fileName);
            byte[] imageData = service.downloadImageFromFileSystem(fileName);
            course.setThumbnaildata(imageData);
        }
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/AllCoursesWithTeachersFileSystem")
    public ResponseEntity<List<Map<String, Object>>> AllCoursesWithTeachersFileSystem() {

        List<CourseTwo> courses = mongoTemplate.findAll(CourseTwo.class);

        List<Map<String, Object>> coursesWithTeacher = courses.stream()
                .map(course -> {
                    Query query = new Query();
                    query.addCriteria(Criteria.where("_id").is(course.getTeacher_id()));
                    Teacher teacher = mongoTemplate.findOne(query, Teacher.class);
                    Map<String, Object> courseWithTeacher = new HashMap<>();
                    courseWithTeacher.put("course_id", course.get_id());
                    courseWithTeacher.put("courseName", course.getCourse());
                    courseWithTeacher.put("duration", course.getDuration());
                    courseWithTeacher.put("thumbnail", course.getThumbnail());
                    courseWithTeacher.put("teacherName", teacher != null ? teacher.getName() : "Unknown");

                    return courseWithTeacher;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(coursesWithTeacher, HttpStatus.OK);
    }

    @GetMapping("/EnrolledCoursesFileSystem")
    public ResponseEntity<List<Map<String, Object>>> EnrolledCoursesFileSystem() {
        int studentId = UserId;
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId));
        List<Enroll> enrolledCourses = mongoTemplate.find(query, Enroll.class);
        List<Map<String, Object>> courses = enrolledCourses.stream()
                .map(enroll -> {
                    Query courseQuery = new Query();
                    courseQuery.addCriteria(Criteria.where("_id").is(enroll.getCourse_id()));
                    CourseTwo course = mongoTemplate.findOne(courseQuery, CourseTwo.class);
                    if (course != null) {
                        Map<String, Object> courseDetails = new HashMap<>();
                        courseDetails.put("course_id", course.get_id());
                        courseDetails.put("courseName", course.getCourse());
                        courseDetails.put("duration", course.getDuration());
                        courseDetails.put("thumbnail", course.getThumbnail());
                        byte[] imageData;
                        try {
                            imageData = service.downloadImageFromFileSystem(course.getThumbnail());
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                        courseDetails.put("thumbnaildata", imageData);
                        return courseDetails;
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping("/AddStudyMaterialsFilesystem")
    public ResponseEntity<String> AddStudyMaterialsFilesystem(@RequestParam("pdf_file") MultipartFile file,
                                                    @RequestParam("thumbnail") MultipartFile file1,
                                                    @RequestParam("course_name") String course
    ) throws IOException {
        long newId = sequenceService.getNextSequenceValue("StudyMaterials");
        StudyMaterialsTwo s = new StudyMaterialsTwo();
        s.set_id((int) newId);
        s.setCourse_name(course);
        s.setTeacher_id((UserId));
        String uploadpdf = service.uploadPdfToFileSystem(file);
        s.setPdf_file(uploadpdf);
        String uploadImage = service.uploadImageToFileSystem(file1);
        s.setThumbnail(uploadImage);
        mongoTemplate.save(s);
        return new ResponseEntity<>("Yes", HttpStatus.OK);
    }

    @GetMapping("/TeacherStudyMaterialsFileSystem")
    public ResponseEntity<List<StudyMaterialsTwo>> TeacherStudyMaterialsFileSystem() throws IOException {

        Query query = new Query();
        query.addCriteria(Criteria.where("teacher_id").is(UserId));
        List<StudyMaterialsTwo> studyMaterials = mongoTemplate.find(query, StudyMaterialsTwo.class);
        for (StudyMaterialsTwo studyMaterial : studyMaterials) {
            String fileName = studyMaterial.getThumbnail();
            byte[] imageData = service.downloadImageFromFileSystem(fileName);
            studyMaterial.setThumbnail_data(imageData);
            String fileName1=studyMaterial.getPdf_file();
            byte[] imageData1 = service.downloadImageFromFileSystem(fileName1);
            studyMaterial.setPdf_file_data(imageData1);

        }
        return new ResponseEntity<>(studyMaterials, HttpStatus.OK);
    }

    @GetMapping("/enrolled-study-materials-FileSystem")
    public ResponseEntity<List<StudyMaterialsTwo>> getEnrolledStudyMaterialsFileSystem() throws IOException {
        int studentId = UserId;

        // Find courses the student is enrolled in
        Query enrollQuery = new Query();
        enrollQuery.addCriteria(Criteria.where("student_id").is(studentId));
        List<Enroll> enrolledCourses = mongoTemplate.find(enrollQuery, Enroll.class);
        // Find study materials uploaded by teachers of those courses
        Set<Integer> teacherIds = new HashSet<>();
        for (Enroll enroll : enrolledCourses) {
            Query courseQuery = new Query();
            courseQuery.addCriteria(Criteria.where("_id").is(enroll.getCourse_id()));
            CourseTwo course = mongoTemplate.findOne(courseQuery, CourseTwo.class);
            if (course != null) {
                teacherIds.add(course.getTeacher_id());
            }
        }
        // Retrieve study materials
        Query studyMaterialQuery = new Query();
        studyMaterialQuery.addCriteria(Criteria.where("teacher_id").in(teacherIds));
        List<StudyMaterialsTwo> studyMaterials = mongoTemplate.find(studyMaterialQuery, StudyMaterialsTwo.class);
        for (StudyMaterialsTwo studyMaterial : studyMaterials) {
            String fileName = studyMaterial.getThumbnail();
            byte[] imageData = service.downloadImageFromFileSystem(fileName);
            studyMaterial.setThumbnail_data(imageData);
            String fileName1=studyMaterial.getPdf_file();
            byte[] imageData1 = service.downloadImageFromFileSystem(fileName1);
            studyMaterial.setPdf_file_data(imageData1);
        }
        return new ResponseEntity<>(studyMaterials, HttpStatus.OK);
    }


    @PostMapping("/AddResource")
    public ResponseEntity<String> addResource(@RequestParam("courseId") int courseId,
                                              @RequestParam("video") MultipartFile videoFile) throws IOException {
        long newResourceId = sequenceService.getNextSequenceValue("VideoSource");
        System.out.println(newResourceId);
        VideoResource newResource = new VideoResource();
        newResource.setCourse_id(courseId);
        newResource.setResource_id((int)newResourceId);
        String uploadVideo = service.uploadVideoToFileSystem(videoFile);
        newResource.setVideo(uploadVideo);
        mongoTemplate.save(newResource);
        return new ResponseEntity<>("Yes", HttpStatus.OK);
    }



    @GetMapping("/GetResources/{id}")
    public ResponseEntity<List<VideoResource>> GetResources(@PathVariable("id") int id) throws IOException {
        Query query = new Query();
        query.addCriteria(Criteria.where("course_id").is(id));
        List<VideoResource> VideoResources = mongoTemplate.find(query, VideoResource.class);
        for (VideoResource vresource : VideoResources) {
            String fileName = vresource.getVideo();
            byte[] imageData = service.downloadImageFromFileSystem(fileName);
            vresource.setVideo_data(imageData);
        }
        return new ResponseEntity<>(VideoResources, HttpStatus.OK);
    }



}





