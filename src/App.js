import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

class App extends Component {

  constructor() {
    super();
    this.state = {
      sharedData: {},
      globalisation: {},
      lang: ""
    };
    this.switchLang = this.switchLang.bind(this);
  }

  componentDidMount() {
    this.loadJson("./shared_data.json", "sharedData").then(_ =>{
      // Check if a langauge is in local storage 
      this.setLang(localStorage.getItem("lang"));
      if(!this.state.lang){
        this.setLang(Object.keys(this.state.sharedData.languages)[0]);
      }
      this.loadJson("./globalisation/" + this.state.lang.toLowerCase() + ".json", "globalisation");
    });
  }



  loadJson(path, field) {
    return fetch(path)
      .then(response => response.json())
      .then(json => {
        this.setState({[field]: json})
      })
      .catch(error => alert(error))
  }
  setLang(lang){
    localStorage.setItem("lang", lang);
    this.setState({lang: lang});
  }
  switchLang(e){
    e.currentTarget.setAttribute("filter", "brightness(40%)");
    document.getElementById("lang-"+this.state.lang)
      .removeAttribute("filter", "brightness(40%)");
    var lang = e.currentTarget.id.replace("lang-", "");
    this.setLang(lang);
    this.loadJson("./globalisation/" + lang.toLowerCase() + ".json", "globalisation");
  }

  generateFlags(){
    var data = this.state.sharedData;
    if(data && data.languages){
      return Object.keys(data.languages).map((key, i) => (
          <div key={key} id={"lang-"+key} style={{ display: "inline", filter: key !== this.state.lang ? "brightness(40%)" : ""}} onClick={this.switchLang}>
            <span
              className="iconify language-icon mr-5"
              data-icon={data.languages[key]}
              data-inline="false"
            ></span>
          </div>
      ));
    }
  }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">
          {this.generateFlags()}
        </div>
        <About
          resumeBasicInfo={this.state.globalisation.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          projects={this.state.globalisation.projects}
          basic_info={this.state.globalisation.basic_info}
          shared_info={this.state.sharedData.projects}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.globalisation.basic_info}
        />
        <Experience
          experience={this.state.globalisation.experience}
          basic_info={this.state.globalisation.basic_info}
          shared_info={this.state.sharedData}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}
export default App;
