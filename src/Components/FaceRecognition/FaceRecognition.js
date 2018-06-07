import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl,box})=>{
    return(
    <div className='tc ma center'>
        <div className='tc absolute mt2 center '>
            <img id='inputimage' src={ imageUrl } alt="faces" width='500px' height='500px'/>
            <div
                className='boundingBox'
                style={{
                    top:box.topRow,
                    right:box.rightCol,
                    bottom:box.bottomRow,
                    left:box.leftCol
                }}
                ></div>
        </div>

    </div>
    );
}
export default FaceRecognition;
