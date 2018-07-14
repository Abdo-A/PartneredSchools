import React, {
    Component
} from 'react';
import schoolsData, { testimonialBackgroundImage, testimonialBackgroundImageDarkness } from '../../data/schoolsData';

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
        schoolLoaded:false,
        userScreenWidth: window.innerWidth
    };
    
    componentWillMount() {

        setInterval(()=>{

            if(window.innerWidth!=this.state.userScreenWidth){
                this.setState(()=>({
                    userScreenWidth: window.innerWidth
                }));
            }
        },10);

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

                {this.state.userScreenWidth<=700?
                    <a id="school_website_button" href={this.state.school.website} target="_blank">School's Website<i className="fas fa-long-arrow-alt-right" id="school_website-arrow"></i></a>
                    :""
                }

                <div id="image-slider">
                    <Carousel showThumbs={false} useKeyboardArrows={true} showStatus={false}>
                        {this.state.school.images.map((image)=>(
                            <div>
                                <img src={image} alt="school" />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="school_text_wrapper">
                    <p>{this.state.school.text1}</p>
                </div>

                <div id="school_testimonial" style={{background:`linear-gradient(rgba(0, 0, 0, ${testimonialBackgroundImageDarkness}), rgba(0, 0, 0, ${testimonialBackgroundImageDarkness})),url(${testimonialBackgroundImage})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div id="school_testimonial_left" className="clearfix">
                        <p id="school_testimonial_title">{this.state.userScreenWidth<=700?"Lite Paper":"Testimonial"}</p>
                    </div>
                    <div id="school_testimonial_right" className="clearfix">
                        <div>
                            <p id="school_testimonial_body">«{" "}{this.state.school.testimonial}{" "}»</p>
                        </div>
                            <br/>
                        <div>
                            <p id="school_testimonial_writer">
                                {this.state.school.testimonial_writer}
                                <br/><br/>
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