package com.appfx.web.pojo;


import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@XmlRootElement
public class TransactionData {

    private int id;
    private int credentialsId;
    private boolean isPurchased;
    private String totalAmount;
    private String handlingAmount;
    private String trackingNumber;
    private String paypalCorrelationId;
    private String paypalTranactionId;
    private List<TransactionItemData> transactionItemDataList;
    private Date date = new Date();

    public TransactionData() {
    }

    public TransactionData(int id, int credentialsId, boolean purchased, String totalAmount, String handlingAmount, String trackingNumber, String paypalCorrelationId, String paypalTranactionId, List<TransactionItemData> transactionItemDataList) {
        this.id = id;
        this.credentialsId = credentialsId;
        isPurchased = purchased;
        this.totalAmount = totalAmount;
        this.handlingAmount = handlingAmount;
        this.trackingNumber = trackingNumber;
        this.paypalCorrelationId = paypalCorrelationId;
        this.paypalTranactionId = paypalTranactionId;
        this.transactionItemDataList = transactionItemDataList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCredentialsId() {
        return credentialsId;
    }

    public void setCredentialsId(int credentialsId) {
        this.credentialsId = credentialsId;
    }

    public boolean isPurchased() {
        return isPurchased;
    }

    public void setPurchased(boolean purchased) {
        isPurchased = purchased;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getHandlingAmount() {
        return handlingAmount;
    }

    public void setHandlingAmount(String handlingAmount) {
        this.handlingAmount = handlingAmount;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getPaypalCorrelationId() {
        return paypalCorrelationId;
    }

    public void setPaypalCorrelationId(String paypalCorrelationId) {
        this.paypalCorrelationId = paypalCorrelationId;
    }

    public String getPaypalTranactionId() {
        return paypalTranactionId;
    }

    public void setPaypalTranactionId(String paypalTranactionId) {
        this.paypalTranactionId = paypalTranactionId;
    }

    public List<TransactionItemData> getTransactionItemDataList() {
        return transactionItemDataList;
    }

    public void setTransactionItemDataList(List<TransactionItemData> transactionItemDataList) {
        this.transactionItemDataList = transactionItemDataList;
    }

    public void addTransactionItemData(TransactionItemData transactionItemData) {
        if (transactionItemDataList == null) {
            transactionItemDataList = new ArrayList<TransactionItemData>();
        }

        transactionItemDataList.add(transactionItemData);
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
