package com.ressumes.Resumes.Person;


import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="Person")
public class Person {


  private @Id @GeneratedValue int PersonID;
  private String firstName;
  private String lastName;
  private Date created_on;
  private Date modified_on;
  public Person(){
  }

  public int getPersonID() {
    return PersonID;
  }

  public void setPersonID(int personID) {
    PersonID = personID;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
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
