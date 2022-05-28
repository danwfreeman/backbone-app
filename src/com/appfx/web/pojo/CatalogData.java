package com.appfx.web.pojo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CatalogData {

    private String itemNumber;
    private String itemName;
    private String description;
    private String thumbnail;
    private String price;

    public CatalogData() {
    }

    public CatalogData(String itemNumber, String itemName, String description, String thumbnail, String price) {
        this.itemNumber = itemNumber;
        this.itemName = itemName;
        this.description = description;
        this.thumbnail = thumbnail;
        this.price = price;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

}
