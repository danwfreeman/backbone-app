package com.appfx.web.dao;


import com.appfx.web.pojo.DeviceData;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DeviceDao {


    public static DeviceData addDevice(DeviceData deviceData) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "insert into devices (device_type, price, description, credentials_id) values (?, ?, ?, ?)";

        PreparedStatement s = c.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
        s.setString( 1, deviceData.getDeviceType() );
        s.setString( 2, deviceData.getPrice());
        s.setString( 3, deviceData.getDescription());
        s.setInt( 4, deviceData.getCredentialsId());
        s.executeUpdate();

        ResultSet rs = s.getGeneratedKeys();

        int id = 0;
        if (rs.next()) {
            id = rs.getInt("GENERATED_KEY");
        }
        deviceData.setId(id);
        Database.closeConnection(c, s, rs);
        return deviceData;
    }


    public static List<DeviceData> getDeviceList(String criteria, String type) throws SQLException {
        Connection c = Database.getConnection();

        PreparedStatement s = null;

        if ("all".equals(type)){
            type = "%"; // match all
        }

        String sql = null;
        if ("".equals(criteria)) {
            sql = "select * from appfx.devices where device_type like ?";
            s = c.prepareStatement( sql);
            s.setString(1, type);
        } else {

            sql = "select * from appfx.devices where device_type like ? and lower(description) like lower(?);";
            s = c.prepareStatement( sql);
            s.setString(1, type);
            s.setString(2, "%"+criteria+"%");
        }


        ResultSet rs = s.executeQuery();

        List<DeviceData> deviceList = new ArrayList<DeviceData>();
        while (rs.next()) {
            DeviceData deviceData = new DeviceData(rs.getInt("id"), rs.getInt("credentials_id"), rs.getString("device_type"), rs.getString("price"), rs.getString("description"));
            deviceList.add(deviceData);
        }

        Database.closeConnection(c, s, rs);

        if (deviceList.size() == 0) {
            return null;
        }

        return deviceList;
    }

    public static void removeDevice(long id) throws SQLException{
        Connection c = Database.getConnection();

        String sql = "delete from devices where id = ?";

        PreparedStatement s = c.prepareStatement( sql);
        s.setLong( 1, id);
        int r = s.executeUpdate();

        Database.closeConnection(c, s);
    }
}
