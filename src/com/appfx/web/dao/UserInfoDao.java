package com.appfx.web.dao;

import com.appfx.web.pojo.UserInfoData;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserInfoDao {

    public static UserInfoData getRegisteredUser(int credentialsId) {
        List<UserInfoData> users = null;
        try {
            users = getUserInfoList(credentialsId);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

        for (UserInfoData u : users) {
            if (UserInfoData.REGISTRATION.equals(u.getType())) {
                return u;
            }
        }
        return null;

    }

    public static List<UserInfoData> getUserInfoList(int credentialsId) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "select * from user_info where credentials_id = ?";
        PreparedStatement s = c.prepareStatement(sql);
        s.setInt(1, credentialsId);

        ResultSet rs = s.executeQuery();

        List<UserInfoData> userInfoList = new ArrayList<UserInfoData>();
        while (rs.next()) {
            UserInfoData userInfoData = new UserInfoData(rs.getInt("id"), rs.getString("type"), rs.getBoolean("same_as"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email"), rs.getString("address1"), rs.getString("address2"), rs.getString("city"), rs.getString("postal"), rs.getString("country"), rs.getString("region"), rs.getString("mobile_number"), rs.getInt("credentials_id"), rs.getDate("created_datetime"), rs.getDate("updated_datetime"));
            userInfoList.add(userInfoData);
        }

        Database.closeConnection(c, s, rs);

        if (userInfoList.size() == 0) {
            return null;
        }
        return userInfoList;
    }

    public static void createUser(UserInfoData userInfoData) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "insert into user_info (type, same_as, first_name, last_name, email, address1, postal, country, region, mobile_number, credentials_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement s = c.prepareStatement(sql);
        s.setString(1, userInfoData.getType());
        s.setBoolean(2, userInfoData.isSameAs());
        s.setString(3, userInfoData.getFirstName());
        s.setString(4, userInfoData.getLastName());
        s.setString(5, userInfoData.getEmail());
        s.setString(6, userInfoData.getAddress1());
        s.setString(7, userInfoData.getPostal());
        s.setString(8, userInfoData.getCountry());
        s.setString(9, userInfoData.getRegion());
        s.setString(10, userInfoData.getMobileNumber());
        s.setInt(11, userInfoData.getCredentialsId());

        s.executeUpdate();
        Database.closeConnection(c, s);
    }


    public static void updateUser(UserInfoData userInfoData) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "update user_info set same_as = ?, first_name = ?, last_name = ?, email = ?, address1 = ?, postal = ?, country = ?, region = ?, mobile_number = ? where credentials_id = ? and type = ?";
        PreparedStatement s = c.prepareStatement(sql);
        s.setBoolean(1, userInfoData.isSameAs());
        s.setString(2, userInfoData.getFirstName());
        s.setString(3, userInfoData.getLastName());
        s.setString(4, userInfoData.getEmail());
        s.setString(5, userInfoData.getAddress1());
        s.setString(6, userInfoData.getPostal());
        s.setString(7, userInfoData.getCountry());
        s.setString(8, userInfoData.getRegion());
        s.setString(9, userInfoData.getMobileNumber());
        s.setInt(10, userInfoData.getCredentialsId());
        s.setString(11, userInfoData.getType());

        s.executeUpdate();
        Database.closeConnection(c, s);

    }


    public static UserInfoData getType(String type, List<UserInfoData> list) {
        for (UserInfoData u : list) {
            if (u.getType().equals(type)) {
                return u;
            }
        }
        return null;
    }


}
