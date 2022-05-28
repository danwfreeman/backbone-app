package com.appfx.web.dao;


import com.appfx.web.pojo.CouponData;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CouponDao {

    public static List<CouponData> isValidCode(String code) throws SQLException {
        Connection c = Database.getConnection();

        PreparedStatement s = null;
        String sql = "select * from coupon where code = ?";

        s = c.prepareStatement(sql);
        s.setString(1, code);
        ResultSet rs = s.executeQuery();

        List<CouponData> couponDataList = new ArrayList<CouponData>();

        while (rs.next()) {
            CouponData couponData = new CouponData(rs.getString("code"), rs.getString("item_number"), rs.getString("price"), rs.getInt("company_id"));
            couponDataList.add(couponData);
        }


        Database.closeConnection(c, s, rs);
        return couponDataList.size() > 0 ? couponDataList : null;


    }

}
