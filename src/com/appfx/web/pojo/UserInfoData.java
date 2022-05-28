package com.appfx.web.pojo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;


@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserInfoData {
    public static final String BILLING = "B";
    public static final String SHIPPING = "S";
    public static final String REGISTRATION = "R";

    private long id;
    private String type;
    private boolean sameAs;
    private String gender;
    private String firstName;
    private String lastName;
    private String address1;
    private String address2;
    private String city;
    private String postal;
    private String region;
    private String country;
    private String mobileNumber;
    private int credentialsId;
    private Date createdDate;
    private Date updatedDate;
    // credentials related, don't persist here
    private String email;
    private String password;

    public UserInfoData() {

    }

    public UserInfoData(UserInfoData data) {
        this.id = data.getId();
        this.type = data.getType();
        this.sameAs = data.isSameAs();
        this.firstName = data.getFirstName();
        this.lastName = data.getLastName();
        this.email = data.getEmail();
        this.address1 = data.getAddress1();
        this.postal = data.getPostal();
        this.region = data.getRegion();
        this.country = data.getCountry();
        this.mobileNumber = data.getMobileNumber();
        this.credentialsId = data.getCredentialsId();
    }

    public UserInfoData(long id, String type, boolean sameAs, String firstName, String lastName, String email, String address1, String address2, String city, String postal, String country, String region, String mobileNumber, int credentialsId, Date createdDate, Date updatedDate) {
        this.id = id;
        this.type = type;
        this.sameAs = sameAs;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.postal = postal;
        this.region = region;
        this.country = country;
        this.mobileNumber = mobileNumber;
        this.credentialsId = credentialsId;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isSameAs() {
        return sameAs;
    }

    public void setSameAs(boolean sameAs) {
        this.sameAs = sameAs;
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

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getPostal() {
        return postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public int getCredentialsId() {
        return credentialsId;
    }

    public void setCredentialsId(int credentialsId) {
        this.credentialsId = credentialsId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
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
}
