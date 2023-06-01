import React from 'react';
import './SliderCss.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import apple from '../../Assets/img/apple.jpg'
import prada from '../../Assets/img/prada.jpg'
import ralph from '../../Assets/img/ralph.jpg'
import bershka from '../../Assets/img/bershka.jpg'
import samsung from '../../Assets/img/samsung.jpg'
import tommy from '../../Assets/img/tommy.jpg'
import dior from '../../Assets/img/dior.jpg'

const Slider = () => {
        return (
            <Carousel className='carousel'
               centerMode
              centerSlidePercentage={60}>
                <div className='div-slider'>
                    <img className='img-slider' alt='' src={apple} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={dior} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={tommy} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={samsung} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={ralph} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={prada} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='img-slider' alt='' src={bershka} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
            </Carousel>
        );
    }

    export default Slider
