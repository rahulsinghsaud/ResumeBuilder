package com.ressumes.Resumes.Refer;


import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="Refer")
public class Refer {
  private @Id @GeneratedValue int referID;
  private String name;
  private String title;
  private String institution;
  private String email;

  public Refer() {
  }

  public int getReferID() {
    return referID;
  }

  public void setReferID(int referID) {
    this.referID = referID;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getInstitution() {
    return institution;
  }

  public void setInstitution(String institution) {
    this.institution = institution;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

}
