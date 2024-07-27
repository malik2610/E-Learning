import React, { useEffect, useState } from 'react';
import Theader from './Theader';
import Tmenubar from './Tmenubar';
import styles from '../student/login.module.css';
import styles2 from '../Teacher/DisplayCourses.module.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PDFViewer, Document, Page, View, Image } from '@react-pdf/renderer';


function AddStudyMaterials() {
  const [courses, setCourses] = useState([]);


  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('course_name', e.target.course.value);
    formData.append('thumbnail', e.target.thumbnail.files[0]);
    formData.append('pdf_file', e.target.pdf_file.files[0]);
    try {
      const response = await Axios.post("http://localhost:8081/AddStudyMaterials", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data === "Yes") {
        alert("Added Successfully");
        navigate("/AddCourse");
      } else {
        alert("Try Again Later");
        navigate("/AddCourse");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };


  // useEffect(() => {
  //   async function fetchTeacherCourses() {
  //     try {
  //       const response = await Axios.get(`http://localhost:8081/TeacherStudyMaterials`);
  //       setCourses(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching teacher courses:', error);
  //     }
  //   }
  //   fetchTeacherCourses();
  // }, []);
  
  useEffect(() => {
    async function fetchTeacherCourses() {
      try {
        const response = await Axios.get(`http://localhost:8081/TeacherStudyMaterialsFileSystem`);
        setCourses(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching teacher courses:', error);
      }
    }
    fetchTeacherCourses();
  }, []);

 
const openFile = (base64Data, fileName) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const array = new Uint8Array(reader.result).subarray(0, 4);
    const header = Array.from(array).map(byte => byte.toString(16)).join('').toUpperCase();
    let mimeType;
    switch (header) {
      case '25504446': // PDF
        mimeType = 'application/pdf';
        break;
      case '504B0304': // ZIP
        mimeType = 'application/zip';
        break;
      case '52617221': // RAR
        mimeType = 'application/x-rar-compressed';
        break;
      case '377ABCAF271C': // 7z
        mimeType = 'application/x-7z-compressed';
        break;
      case 'D0CF11E0': // DOC or DOCX
        mimeType = 'application/msword';
        break;
      case '504B0304': // PPT or PPTX
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      default:
        console.error('Unsupported file format');
        return;
    }
    console.log(header)
    if (mimeType) {
      if (mimeType === 'application/pdf') {
        const MyPdfDocument = () => (
          <Document>
            <Page size="A4">
              <View>
                <Image src={`data:image/jpeg;base64,${base64Data}`} />
              </View>
            </Page>
          </Document>
        );

        const pdfBlob = new Blob([base64toBlob(base64Data)], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const pdfWindow = window.open(pdfUrl, '_blank');
        if (!pdfWindow) {
          alert('Please allow pop-ups for this website');
        }
      } else if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        const viewerUrl = `https://docs.google.com/viewer?url=data:${mimeType};base64,${base64Data}&embedded=true`;
        window.open(viewerUrl);
      } else if (mimeType === 'application/msword') {
        console.log('Opening DOC file:', fileName);
      }
    } else {
      console.error('Unsupported file format:', header);
    }
  };
  reader.readAsArrayBuffer(base64toBlob(base64Data));
};
  

  

  const base64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'application/octet-stream' });
  };

  const downloadFile = (base64Data, fileName) => {
    const blob = base64toBlob(base64Data);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
    window.URL.revokeObjectURL(url);
  };


  return (
    <div>
      <Theader />
      <Tmenubar />
      <div className={styles.loginform2}>
        <center><h2>Add Course Materials</h2></center>
        <br />
        <br />
        <form onSubmit={SubmitHandler}>
          <div className={styles.formgroup}>
            <label>Course</label>
            <input type="text" name="course" placeholder='Enter course name' />
          </div>
          <div className={styles.formgroup}>
            <label>image</label>
            <input className={styles2.smt} type="file" name="thumbnail" id="file" accept="image/*" />
          </div>
          <div className={styles.formgroup}>
            <label>File</label>
            <input type="file" name="pdf_file" id="file" accept="pdf/*" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className={`${styles2.CContainer} ${styles2.smc}`}>

        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <div className={styles2.thumbnail} onClick={() => openFile(course.pdf_file_data, course.course_name)}>
                {/* <img src={`data:image/jpeg;base64,${course.thumbnail}`} alt={`Course thumbnail for ${course.course_name}`} /> */}
                <img src={`data:image/jpeg;base64,${course.thumbnail_data}`} alt={`Course thumbnail for ${course.course_name}`} />
              </div>
              <p>
                <b>Course:</b> {course.course_name}
              </p>
              {/* <button onClick={() => downloadFile(course.pdf_file, `${course.course_name}.pdf`)}> */}
              <button onClick={() => downloadFile(course.pdf_file_data, `${course.course_name}.pdf`)}>
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddStudyMaterials;
