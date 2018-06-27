import React, {
    Component
} from 'react';
import schoolsData from '../../data/schoolsData';
import './School.css';

class School extends Component {
    state = {
        school: {
            id: undefined,
            name: "",
            urlName: "",
            text: "",
            image: "",
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
                <h1 id="school_name">{this.state.school.name}</h1>
                <img id="school_img" src={this.state.school.image} alt="school"/>
                <div id="school_text_wrapper">
                    <p id="school_text">{this.state.school.text}</p>
                </div>
             </div>
        );
    };
}

export default School;