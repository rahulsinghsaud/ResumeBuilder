package com.ressumes.Resumes.Address;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="Address")
public class Address {

  private @Id @GeneratedValue int addressid;
  private String address1;
  private String address2;
  private String contactNumber1;
  private String contactNumber2;
  private Date created_on;
  private Date modified_on;

  public Address(){
  }


  public int getAddressid() {
    return addressid;
  }

  public void setAddressid(int addressid) {
    this.addressid = addressid;
  }

  public String getAddress1() {
    return address1;
  }




  public void setAddress1(String address1) {
    this.address1 = address1;
  }

  public String getAddress2() {
    return address2;
  }

  public void setAddress2(String address2) {
    this.address2 = address2;
  }

  public String getContactNumber1() {
    return contactNumber1;
  }

  public void setContactNumber1(String contactNumber1) {
    this.contactNumber1 = contactNumber1;
  }

  public String getContactNumber2() {
    return contactNumber2;
  }

  public void setContactNumber2(String contactNumber2) {
    this.contactNumber2 = contactNumber2;
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
