import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.projects && this.props.basic_info && this.props.shared_info) {
      var sectionName = this.props.basic_info.section_name.projects;
      var projects = this.props.shared_info;
      
      var projectElements = Object.entries(projects).map(([projectId, _]) => {
        Object.entries(this.props.projects[projectId]).forEach(([field, value]) => {
          projects[projectId][field] = value;
        });
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects[projectId].title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(projects[projectId])}>
                <div>
                  <img
                    src={projects[projectId].images[0]}
                    alt="projectImages"
                    height="230"
                    style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                  />
                  <span className="project-date">{projects[projectId].startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {projects[projectId].title}
                  </p>
                </div>
              </div>
            </span>
          </div>
        )
      })
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projectElements}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
