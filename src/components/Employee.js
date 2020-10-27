/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from "react";
import { Link } from "react-router-dom";
import Api from "../utils/api";

const skillImage = require("../img/skill.svg");

class Employee extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [],
    };
  }

  componentDidMount() {
    Api.getSkills()
      .then((response) => {
        this.setState({ skills: response.data.currentSkills });
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  render() {
    const { skills } = this.state;
    return (
      <div className="skillContainer">
        {skills.map((skill, index) => (
          <div key={skill.skill_id} className="skill">
            <Link
              key={skill.skill_id}
              to={{
                pathname: `detail/${index}`,
                state: {
                  skillName: skill.name,
                  skill,
                },
              }}
            >
              <div style={{ width: "100%", textAlign: "center" }}>
                <img
                  style={{ width: "25%" }}
                  src={skillImage}
                  alt="Musical Skill"
                />
              </div>
              <h2 key={skill.name}>
                <p>{skill.name}</p>
                <p>{skill.sum}</p>
              </h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Employee;
