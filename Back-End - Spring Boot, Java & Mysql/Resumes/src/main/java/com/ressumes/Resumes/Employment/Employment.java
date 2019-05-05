package com.ressumes.Resumes.Employment;


import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="Employment")
public class Employment {

  private @Id @GeneratedValue int employmentID;
  private String companyName;
  private String jobDescription;
  private Date startDate;
  private Date endDate;
  private Date created_on;
  private Date modified_on;

  public Employment() {
  }

  public int getEmploymentID() {
    return employmentID;
  }

  public void setEmploymentID(int employmentID) {
    this.employmentID = employmentID;
  }

  public String getJobDescription() {
        return jobDescription;
    }

   public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public Date getStartDate() {
    return startDate;
  }

  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
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
