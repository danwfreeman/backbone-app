package com.appfx.web.pojo;


public class ZoneData {
    private int lowZip;
    private int highZip;
    private int zone;

    public ZoneData(int lowZip, int highZip, int zone) {
        this.lowZip = lowZip;
        this.highZip = highZip;
        this.zone = zone;
    }

    public int getLowZip() {
        return lowZip;
    }

    public void setLowZip(int lowZip) {
        this.lowZip = lowZip;
    }

    public int getHighZip() {
        return highZip;
    }

    public void setHighZip(int highZip) {
        this.highZip = highZip;
    }

    public int getZone() {
        return zone;
    }

    public void setZone(int zone) {
        this.zone = zone;
    }
}
