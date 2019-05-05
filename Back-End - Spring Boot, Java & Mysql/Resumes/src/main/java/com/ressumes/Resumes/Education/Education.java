package com.ressumes.Resumes.Education;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;


@Entity
@Table(name="Education")
public class Education {

  private @Id @GeneratedValue int eductationID;
  private String institutionName;
  private String degree;
  private java.sql.Timestamp startDate;
  private java.sql.Timestamp endDate;
  private Date created_on;
  private Date modified_on;


  public Education() {
  }

  public int getEductationID() {
    return eductationID;
  }

  public void setEductationID(int eductationID) {
    this.eductationID = eductationID;
  }

  public String getInstitutionName() {
    return institutionName;
  }

  public void setInstitutionName(String institutionName) {
    this.institutionName = institutionName;
  }

  public String getDegree() {
    return degree;
  }

  public void setDegree(String degree) {
    this.degree = degree;
  }

  public Timestamp getStartDate() {
    return startDate;
  }

  public void setStartDate(Timestamp startDate) {
    this.startDate = startDate;
  }

  public Timestamp getEndDate() {
    return endDate;
  }

  public void setEndDate(Timestamp endDate) {
    this.endDate = endDate;
  }

  public Date getCreated_on() {
    return created_on;
  }

  public void setCreated_on(Date created_on) {
    this.created_on = created_on;
  }

  public Date getModified_on() {
    return modified_on;
  }

  public void setModified_on(Date modified_on) {
    this.modified_on = modified_on;
  }
}
