package com.appfx.web.dao;


import com.appfx.web.pojo.ZoneData;
import com.appfx.web.pojo.ZoneRateData;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ZoneDao {

    public static List<ZoneData> getZoneList() throws SQLException {
        Connection c = Database.getConnection();
        PreparedStatement s = null;

        String sql = "select low_zip, high_zip, zone from appfx.zones;";
        s = c.prepareStatement(sql);

        ResultSet rs = s.executeQuery();

        List<ZoneData> zoneDataList = new ArrayList<ZoneData>();

        while (rs.next()) {
            ZoneData zoneData = new ZoneData(rs.getInt("low_zip"), rs.getInt("high_zip"), rs.getInt("zone"));
            zoneDataList.add(zoneData);
        }

        Database.closeConnection(c, s, rs);
        return zoneDataList;
    }


    public static List<ZoneRateData> getZoneRateList() throws SQLException {
        Connection c = Database.getConnection();
        PreparedStatement s = null;

        String sql = "select zone, cost_single_car, cost_multiple_cars from zone_rates;";
        s = c.prepareStatement(sql);

        ResultSet rs = s.executeQuery();

        List<ZoneRateData> zoneRateDataList = new ArrayList<ZoneRateData>();

        while (rs.next()) {
            ZoneRateData zoneRateData = new ZoneRateData(rs.getInt("zone"), rs.getString("cost_single_car"), rs.getString("cost_multiple_cars"));
            zoneRateDataList.add(zoneRateData);
        }

        Database.closeConnection(c, s, rs);
        return zoneRateDataList;
    }


}
