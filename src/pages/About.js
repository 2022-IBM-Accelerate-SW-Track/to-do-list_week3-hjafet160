import React, { Component } from 'react';
import "./About.css";
import profile_pic from "../assets/profile_pic.jpeg";
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Picture"
              ></img>
            </div>
          </div>
          <div className="split right">
            <div className="centered">
              <div className="name_title">Jafet Hernandez</div>
              <div className="brief_description">
                Hello! I am a sophomore student at the University of Puerto Rico, Mayagüez.
                I am part of Puerto Rico's Water Polo National Team and I love to eat
                Mexican food. I have many musical interests but I especially like dancing to "bachata". 
                Have a wonderful day!
              </div>
            </div>
          </div>
      </div>
    )
  }
}
