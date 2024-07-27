import React from 'react';
import styles from "../student/student.module.css"; 

function GetStarted() {
    return (
        <div>
            <a href='/studentLogin'>
                <button className={styles.Login}> {/* Applying CSS module class name */}
                    GET STARTED NOW <i className={styles.arrow}></i> {/* Applying CSS module class name */}
                </button>
            </a>
            {/* <button>
                VIEW COURSE <i className='arrow'></i>
            </button> */}
        </div>
    );
}

export default GetStarted;
