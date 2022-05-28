package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PaymentData {
    private int id;
    private String expiryMonth;
    private String expiryYear;
    private String name;
    private String number;
    private String type;
    private String cvv;

    public PaymentData(){}

    public PaymentData(int id, String expiryMonth, String expiryYear, String name, String number, String type, String cvv) {
        this.id = id;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.name = name;
        this.number = number;
        this.type = type;
        this.cvv = cvv;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getExpiryMonth() {
        return expiryMonth;
    }

    public void setExpiryMonth(String expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    public String getExpiryYear() {
        return expiryYear;
    }

    public void setExpiryYear(String expiryYear) {
        this.expiryYear = expiryYear;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /**
     * clear out all fields and mask all but last 4 of cc number
     */
    public void mask() {
        this.id = 0;
        this.expiryMonth = "";
        this.expiryYear = "";
        this.name = "";
        this.number = maskNumber();
        this.type = "";
        this.cvv = "";
    }

    private String maskNumber() {
        return null;  //To change body of created methods use File | Settings | File Templates.
    }
}
