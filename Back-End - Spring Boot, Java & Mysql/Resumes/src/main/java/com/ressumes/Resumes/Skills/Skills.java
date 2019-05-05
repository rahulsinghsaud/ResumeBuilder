package com.ressumes.Resumes.Skills;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Skills")
public class Skills {

  private @Id @GeneratedValue int skillsID;
  private String skillName;
  private String skillLevel;
  private Date created_on;
  private Date modified_on;

  public Skills() {
  }

  public int getSkillsID() {
    return skillsID;
  }


  public void setSkillsID(int skillsID) {
    this.skillsID = skillsID;
  }

  public String getSkillName() {
    return skillName;
  }

  public void setSkillName(String skillName) {
    this.skillName = skillName;
  }

  public String getSkillLevel() {
    return skillLevel;
  }

  public void setSkillLevel(String skillLevel) {
    this.skillLevel = skillLevel;
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
