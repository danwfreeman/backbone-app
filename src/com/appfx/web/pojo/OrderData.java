package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class OrderData {
    private List<CartData> cartDataList;
    private PaymentData paymentData;
    private List<UserInfoData> userInfoDataList;
    private String couponCode;
    private String itunesCode;
    private String handling;
    private String trackingNumber;
    private String invoiceNumber;
    private String grandTotal;
    private String total;
    private String remoteAddress;
    private String payPalErrorCode;
    private List<String> payPalErrorList;
    private boolean emailSent;
    private String purchaseDate;


    public OrderData() {
    }

    public OrderData(List<CartData> cartDataList, PaymentData paymentData, List<UserInfoData> userInfoDataList) {
        this.cartDataList = cartDataList;
        this.paymentData = paymentData;
        this.userInfoDataList = userInfoDataList;
    }

    public void maskPaymentData() {
        paymentData.mask();
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public String getItunesCode() {
        return itunesCode;
    }

    public void setItunesCode(String itunesCode) {
        this.itunesCode = itunesCode;
    }

    public String getHandling() {
        return handling;
    }

    public void setHandling(String handling) {
        this.handling = handling;
    }

    public List<CartData> getCartDataList() {
        return cartDataList;
    }

    public void setCartDataList(List<CartData> cartDataList) {
        this.cartDataList = cartDataList;
    }

    public PaymentData getPaymentData() {
        return paymentData;
    }

    public void setPaymentData(PaymentData paymentData) {
        this.paymentData = paymentData;
    }

    public List<UserInfoData> getUserInfoDataList() {
        return userInfoDataList;
    }

    public void setUserInfoDataList(List<UserInfoData> userInfoDataList) {
        this.userInfoDataList = userInfoDataList;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(String grandTotal) {
        this.grandTotal = grandTotal;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getRemoteAddress() {
        return remoteAddress;
    }

    public void setRemoteAddress(String remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

    public String getPayPalErrorCode() {
        return payPalErrorCode;
    }

    public void setPayPalErrorCode(String payPalErrorCode) {
        this.payPalErrorCode = payPalErrorCode;
    }

    public List<String> getPayPalErrorList() {
        return payPalErrorList;
    }

    public void setPayPalErrorList(List<String> payPalErrorList) {
        this.payPalErrorList = payPalErrorList;
    }

    public boolean isEmailSent() {
        return emailSent;
    }

    public void setEmailSent(boolean emailSent) {
        this.emailSent = emailSent;
    }

    public String getEailAddress() {

        return null;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
