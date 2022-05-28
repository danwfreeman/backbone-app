package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CartData {

    private String id;
    private String itemName;
    private String itemNumber;
    private String description;
    private String thumbnail;
    private String couponCode;
    private boolean isPurchased;
    private int credentialsId;
    private String couponPrice;
    private int quantity;
    private String price;
    private String total;
    private boolean isDiscounted;

    public CartData() {
    }


    public CartData(String id, String catalogName, String itemName, String itemNumber, String description, String thumbnail, String couponCode, boolean purchased, int credentialsId, String couponPrice, int quantity, String price, String total) {
        this.id = id;
        this.itemName = itemName;
        this.itemNumber = itemNumber;
        this.description = description;
        this.thumbnail = thumbnail;
        this.couponCode = couponCode;
        isPurchased = purchased;
        this.credentialsId = credentialsId;
        this.couponPrice = couponPrice;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public boolean isPurchased() {
        return isPurchased;
    }

    public void setPurchased(boolean purchased) {
        isPurchased = purchased;
    }

    public int getCredentialsId() {
        return credentialsId;
    }

    public void setCredentialsId(int credentialsId) {
        this.credentialsId = credentialsId;
    }

    public String getCouponPrice() {
        return couponPrice;
    }

    public void setCouponPrice(String couponPrice) {
        this.couponPrice = couponPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTotal() {

        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }


    public boolean isDiscounted() {
        return isDiscounted;
    }

    public void setDiscounted(boolean discounted) {
        isDiscounted = discounted;
    }
}
