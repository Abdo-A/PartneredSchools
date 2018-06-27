import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import schoolsData from '../../data/schoolsData';
import './PartneredSchools.css';
import alphabet from '../../data/alphabet';
import continents from '../../data/continents';
import countries from '../../data/countries';

class PartneredSchools extends Component {

    state={
        showedSchools:''
    };

    showAllSchools = ()=>{
        this.setState(()=>({
            showedSchools:schoolsData
        }));
    };

    showBasedOnLetter=(letter)=>{
        let showedSchools=schoolsData.filter((school)=>{
            if(school.name.split('')[0].toLowerCase()===letter){
                return true;
            }
            else {
                return false;
            }
        });
        this.setState(()=>({
            showedSchools:showedSchools
        }));
    };

    showBasedOnCountry=()=>{
        let select=document.getElementById("countriesSelect");
        let country = select.options[select.selectedIndex].value;
        if(country==="") return;
        let showedSchools=schoolsData.filter((school)=>{
            if(school.country===country){
                return true;
            } else {
                return false;
            }
        });
        this.setState(()=>({
            showedSchools:showedSchools
        }));
    };

    showBasedOnContinent=()=>{
        let select=document.getElementById("continentsSelect");
        let continent = select.options[select.selectedIndex].value;
        if(continent==="") return;
        let showedSchools=schoolsData.filter((school)=>{
            if(school.continent===continent){
                return school;
            }
        });
        this.setState(()=>({
            showedSchools:showedSchools
        }));
    };
    
    goToSchool=(schoolName)=>{
        let url = schoolName.split(" ").join("");
        console.log(url);
        this.props.history.push(url);
    };

    componentWillMount() {
        this.showAllSchools();
    };
    

    render() {
        return (
            <div id="partneredschools">
                <div id="partneredschools_left_column">
                    <p id="partneredschools_secondary_title">List of the partner schools</p>
                    <span id="partneredschools_horizontal_line"></span>
                    <span id="partneredschools_letters">
                    {alphabet.map((letter)=>{
                        return (
                        <div id="partneredschools_letter_wrapper" key={letter}>
                            <div>
                                <span id="partneredschools_letter" onClick={()=>{this.showBasedOnLetter(letter)}}>{letter.toUpperCase()}</span>
                            </div>
                        </div>)
    })}
                    </span>
                </div>

                <div id="partneredschools_selects">
                    <select onClick={()=>{this.showBasedOnContinent()}} id="continentsSelect">
                        <option value="" selected disabled>Select Continent</option>
                        {continents.map((continent)=>
                            (
                                <option key={continent} value={continent}>{continent}</option>
                            ))}
                    </select>
                    <select onClick={()=>{this.showBasedOnCountry()}} id="countriesSelect">
                        <option value="" selected disabled>Select Country</option>
                        {countries.map((country)=>
                            (
                                <option key={country} value={country}>{country}</option>
                            ))}
                    </select>
                </div>

                <div>
                    {this.state.showedSchools.map((school)=>(
                        <div id="partneredschools_card" key={school.id}>
                            <h2 id="partneredschools_card_title" onClick={()=>{this.goToSchool(school.name)}}>{school.name}</h2>
                            <h4 id="partneredschools_card_city_country">{school.country.toUpperCase()},{" "}{school.city}</h4>
                            <a id="partneredschools_card_website" href={school.website} target="_blank">visit school's website</a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PartneredSchools;