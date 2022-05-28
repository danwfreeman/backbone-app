package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CredentialsData {
    private int id;
    private String email;
    private transient String password; // encrypted
    //private String token;
    private boolean isGuest;

    public CredentialsData() {
    }

    public CredentialsData(int id, String email, String password, boolean guest) {
        this.id = id;
        this.email = email;
        this.password = password;
//        this.token = token;
        isGuest = guest;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }

    public boolean isGuest() {
        return isGuest;
    }

    public void setGuest(boolean guest) {
        isGuest = guest;
    }
}
