package com.appfx.web.pojo;


public class ZoneRateData {
    private int zone;
    private String costSingleCar;
    private String costMultipleCars;

    public ZoneRateData(int zone, String costSingleCar, String costMultipleCars) {
        this.zone = zone;
        this.costSingleCar = costSingleCar;
        this.costMultipleCars = costMultipleCars;
    }

    public int getZone() {
        return zone;
    }

    public void setZone(int zone) {
        this.zone = zone;
    }

    public String getCostSingleCar() {
        return costSingleCar;
    }

    public void setCostSingleCar(String costSingleCar) {
        this.costSingleCar = costSingleCar;
    }

    public String getCostMultipleCars() {
        return costMultipleCars;
    }

    public void setCostMultipleCars(String costMultipleCars) {
        this.costMultipleCars = costMultipleCars;
    }
}
