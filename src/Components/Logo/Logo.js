import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';
const Logo=()=>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2"
                options={{
                     max : 60,
                     easing:"cubic-bezier(.03,.98,.52,.99)",
                     perspective:1000,
                     transition:true,
                     speed:10,
                     scale:1.1
                  }}
                  style={{ height: 200, width: 200 }}
                  >
             <div className="Tilt-inner pa4 ma3"> <img style={{paddingTop:'15px',width:'150px',display:'center'}} src={brain} alt="brain"/> </div>
            </Tilt>
        </div>
    );
}
export default Logo;
