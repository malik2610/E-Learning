import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Theader from './Theader';
import styles1 from '../student/Enrol.module.css';
import "../Teacher/videoDisplay.css"
import CHeader from './CHeader';
const Course = () => {

  const { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleVideoClick = (video_data, fileName, video) => {
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    const fileType = getFileType(fileExtension);
    const base64Data = atob(video_data);
    const arrayBuffer = new ArrayBuffer(base64Data.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64Data.length; i++) {
      uintArray[i] = base64Data.charCodeAt(i);
    }

    const blob = new Blob([uintArray], { type: fileType });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setCurrentVideo(video);
  };

  function getFileType(fileExtension) {
    switch (fileExtension) {
      case "mp4":
        return "video/mp4";
      case "avi":
        return "video/avi";
      case "mov":
        return "video/quicktime";
      case "wmv":
        return "video/x-ms-wmv";
      case "flv":
        return "video/x-flv";
      case "mkv":
        return "video/x-matroska";
      default:
        return "video/unknown";
    }
  }

  useEffect(() => {
    async function fetchVideoResources() {
      try {
        const response = await Axios.get(`http://localhost:8081/GetResources/${courseId}`);
        setCourses(response.data);
        if (response.data.length > 0) {
          const firstVideo = response.data[0];
          handleVideoClick(firstVideo.video_data, firstVideo.video, firstVideo);
        }
      } catch (error) {
        console.error('Error fetching teacher courses:', error);
      }
    }
    fetchVideoResources();
  }, [courseId]);

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.load();

    }
  }, [currentVideo]);

  useEffect(() => {
    if (videoUrl) {
      return () => {
        URL.revokeObjectURL(videoUrl);
      };
    }
  }, [videoUrl]);

  return (
    <div className='courseBody'>
      <div>
        <CHeader />
      </div>
      <br />
      <br />
      <br />
      <br />

      {/* <div>
        <h2>Course ID: {courseId}</h2>
      </div> */}
      <div className='videoContainer'>
        {videoUrl && (
          <video className='video' ref={videoRef} controls style={{ objectFit: 'contain', backgroundColor: '#000' }}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        )}
      </div>

      <div className='eplistContainer'>
        <table className='eplist'>
          <thead>
            <tr>
              <th>Resource Id</th>
              <th>Video</th>
              <th>play</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={3}>No Data Available</td>
              </tr>
            ) : (
              courses.map((video,index) => (
                <tr key={video.resource_id}>
                  <td>{index+1}</td>
                  <td>{video.video}</td>
                  <td>
                    <input className='play' type='button' value={'Play'} onClick={() => handleVideoClick(video.video_data, video.video, video)}/>
                  </td>
           
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;