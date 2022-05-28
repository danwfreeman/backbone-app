package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class DeviceData {

    private long id;
    private String deviceType;
    private String price;
    private String description;
    private int credentialsId;
    private String email;
    private String deviceMessage;
    private String deviceName;

    public DeviceData() {

    }

    public DeviceData(long id, int credentialsId, String deviceType, String price, String description) {
        this.id = id;
        this.credentialsId = credentialsId;
        this.deviceType = deviceType;
        this.price = price;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCredentialsId() {
        return credentialsId;
    }

    public void setCredentialsId(int credentialsId) {
        this.credentialsId = credentialsId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDeviceMessage() {
        return deviceMessage;
    }

    public void setDeviceMessage(String deviceMessage) {
        this.deviceMessage = deviceMessage;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }
}
