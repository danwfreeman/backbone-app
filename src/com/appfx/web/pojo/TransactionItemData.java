package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TransactionItemData {

    private int id;
    private int transactionId;
    private String itemNumber;
    private int quantity;
    private String couponCode;
    private String amount;

    public TransactionItemData() {
    }

    public TransactionItemData(int id, int transactionId, String itemNumber, int quantity, String couponCode, String amount) {
        this.id = id;
        this.transactionId = transactionId;
        this.itemNumber = itemNumber;
        this.quantity = quantity;
        this.couponCode = couponCode;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
