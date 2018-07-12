import React, {
    Component
} from 'react';
import schoolsData, { testimonialBackgroundImage } from '../../data/schoolsData';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import './School.css';

class School extends Component {
    state = {
        school: {
            id: undefined,
            name: "",
            urlName: "",
            text: "",
            images: "",
            continent: "",
            country: "",
            city: ""
        },
        schoolLoaded:false
    };
    
    componentWillMount() {
        schoolsData.forEach((school) => {
            if (school.name.split(" ").join("") === this.props.match.params.name) {
                this.setState(()=>({school:school, schoolLoaded:true}));
            }
        });
        return true;
    };
    
    render() {
        return (
            <div id="school"> 
                <div id="image-slider">
                    <Carousel width="625px" showThumbs={false} useKeyboardArrows={true}>
                        {this.state.school.images.map((image)=>(
                            <div>
                                <img src={image} height="800px" width="625px" alt="school"/>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="school_text_wrapper">
                    <p>{this.state.school.text1}</p>
                </div>

                <div id="school_testimonial" style={{background:`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${testimonialBackgroundImage})`}}>
                    <div id="school_testimonial_left">
                        <p id="school_testimonial_title">Testimonial</p>
                    </div>
                    <div id="school_testimonial_right">
                        <div>
                            <p id="school_testimonial_body">&#8810;{" "}{this.state.school.testimonial}{" "}&#8811;</p>
                        </div>
                            <br/>
                        <div>
                            <p id="school_testimonial_writer">
                                {this.state.school.testimonial_writer}
                                <br/>
                                {this.state.school.testimonial_writer_title}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="school_text_wrapper">
                    <p>{this.state.school.text2}</p>
                </div>

             </div>
        );
    };
}

export default School;