package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ContactData {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String message;
    private boolean agreeBox;

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isAgreeBox() {
        return agreeBox;
    }

    public void setAgreeBox(boolean agreeBox) {
        this.agreeBox = agreeBox;
    }

    public String toString(){
        return "ContactData";
    }


}