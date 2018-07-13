import React, { Component } from 'react';
import './PartneredSchools.css';

import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';

import schoolsData from '../../data/schoolsData';
import alphabet from '../../data/alphabet';
import continents from '../../data/continents';
import countries, { asianCountries, europeanCountries, africanCountries, oceaniaCountries, northAmericanCountries, southAmericanCountries } from '../../data/countries';


class PartneredSchools extends Component {

    state={
        showedSchools:'',
        selectedCountry:'',
        selectedContinent:'',
        countriesToSelectFrom: countries
    };

    componentDidMount() {
        configureAnchors({offset:-60,scrollDuration:1000});
        
        document.getElementsByClassName("partneredschools_letter")[0].style.color="#bd1a41";
    }

    showAllSchools = ()=>{
        this.setState(()=>({
            showedSchools:schoolsData
        }));
    };

    showBasedOnLetter=(letter)=>{ //Not used for now =>  onClick={()=>{this.showBasedOnLetter(letter)}}
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

    colorMe=(event)=>{
        let SchoolsForThisLetter=this.state.showedSchools.filter((school)=>{
            return school.name[0]==event.target.innerHTML.toUpperCase();
        })

        if(SchoolsForThisLetter.length>0) {
            let letters = document.getElementsByClassName("partneredschools_letter");
            Array.prototype.forEach.call(letters, (el)=>{
                el.style.color="#a9a6ba";
            });
            event.target.style.color="#bd1a41";
        }
    };

    showBasedOnCountry=()=>{
        let select=document.getElementById("countriesSelect");
        let country = select.options[select.selectedIndex].value;
        if(country==="") {
            this.setState(()=>({
                selectedCountry:''
            }));
            return;
        }
        this.setState(()=>({
            selectedCountry:country
        }));
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
        if(continent==="") {
            this.setState(()=>({
                selectedContinent:''
            }));
            return;
        }
        this.setState(()=>({
            selectedContinent:continent
        }));

        switch (continent) {
            case "Europe":
                this.setState(()=>({
                    countriesToSelectFrom:europeanCountries
                }));
                break;
            case "Africa":
                this.setState(()=>({
                    countriesToSelectFrom:africanCountries
                }));
                break;
            case "Asia":
                this.setState(()=>({
                    countriesToSelectFrom:asianCountries
                }));
                break;
            case "North America":
                this.setState(()=>({
                    countriesToSelectFrom:northAmericanCountries
                }));
                break;
            case "South America":
                this.setState(()=>({
                    countriesToSelectFrom:southAmericanCountries
                }));
                break;
            case "North America":
                this.setState(()=>({
                    countriesToSelectFrom:northAmericanCountries
                }));
                break;
            case "Oceania":
                this.setState(()=>({
                    countriesToSelectFrom:oceaniaCountries
                }));
                break;
        
            default:
                this.setState(()=>({
                    countriesToSelectFrom:countries
                }));
                break;
        }

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
        this.props.history.push("partneredschools/"+url);
    };

    componentWillMount() {
        this.showAllSchools();
    };
    

    render() {



        return (
            <div id="partneredschools">
                <div className="container">

                    <div id="partneredschools_left_column" className="clearfix">
                        <p id="partneredschools_secondary_title">List of the <br/> partner schools</p>
                        <div id="partneredschools_letters">
                        {alphabet.map((letter)=>{
                            return (
                            <div id="partneredschools_letter_wrapper" className="partneredschools_letter_wrapper" key={letter}>
                                <div>
                                    <a href={"#"+letter} id="partneredschools_letter" className="partneredschools_letter" onClick={(event)=>{this.colorMe(event)}}>{letter.toUpperCase()}</a>
                                </div>
                            </div>)
        })}
                        </div>
                    </div>

                    


                    <div className="partneredschools_cards_wrapper clearfix">

                        <div id="partneredschools_selects">

                            <select onClick={()=>{this.showBasedOnContinent()}} id="continentsSelect" className="clearfix">
                                <option value="" selected disabled>Continent</option>
                                {continents.map((continent)=>
                                    (
                                        <option key={continent} value={continent}>{continent}</option>
                                    ))}
                            </select>
                        
                            <select onClick={()=>{this.showBasedOnCountry()}} id="countriesSelect" className="clearfix">
                                <option value="" selected disabled>Country</option>
                                {this.state.countriesToSelectFrom.map((country)=>
                                    (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                            </select>

                        </div>


                    {alphabet.map((letter)=>{
                        
                        let SchoolsForThisLetter=this.state.showedSchools.filter((school)=>{
                            return school.name[0]==letter.toUpperCase();
                        })

                        if(SchoolsForThisLetter.length>0)
                            return (
                            <ScrollableAnchor id={letter}>
                                <div className="partneredschools_letter_and_cards_wrapper" key={letter}>
                                    <div>
                                        <a id="partneredschools_letter_for_cards">{letter.toUpperCase()}</a>
                                    </div>
                                    <br/>
                                        <div id="partneredschools_cards_for_this_letter">
                                        {SchoolsForThisLetter.map((school)=>{
                                            return (
                                            <div id="partneredschools_card" key={school.id} className="clearfix">
                                                <h2 id="partneredschools_card_title" onClick={()=>{this.goToSchool(school.name)}}>{school.name}</h2>
                                                <h4 id="partneredschools_card_city_country">{school.country.toUpperCase()},{" "}{school.city}</h4>

                                                {school.website? 
                                                <a id="partneredschools_card_website" href={school.website} target="_blank"><i class="fas fa-external-link-alt"></i>{" "}School's website</a>
                                                :
                                                <h2 id="partneredschools_card_website" onClick={()=>{this.goToSchool(school.name)}}>Know more about school's partnership{" "}<i class="fas fa-long-arrow-alt-right"></i></h2>
                                                
                                                }

                                            </div>
                                            )})}
                                        </div>
                                </div>
                            </ScrollableAnchor>
                        )
    })}
                    </div>

                </div>
            </div>
        );
    }
}

export default PartneredSchools;