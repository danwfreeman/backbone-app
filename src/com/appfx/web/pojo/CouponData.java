package com.appfx.web.pojo;


public class CouponData {
    private String code;
    private String itemNumber;
    private String price;
    private int companyId;

    public CouponData(String code, String itemNumber, String price, int companyId) {
        this.code = code;
        this.itemNumber = itemNumber;
        this.price = price;
        this.companyId = companyId;
    }

    public String getCode() {
        return code;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }
}
