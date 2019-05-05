package com.ressumes.Resumes.Title;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="Title")
public class Title {

  private @Id @GeneratedValue int titleid;
  private String titleName;
  private String personalSummary;
  private Date created_on;
  private Date modified_on;

  public Title() {

  }

  public int getTitleid() {
    return titleid;
  }

  public void setTitleid(int titleid) {
    this.titleid = titleid;
  }

  public String getTitleName() {
    return titleName;
  }

  public void setTitleName(String titleName) {
    this.titleName = titleName;
  }

  public String getPersonalSummary() {
    return personalSummary;
  }

  public void setPersonalSummary(String personalSummary) {
    this.personalSummary = personalSummary;
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
