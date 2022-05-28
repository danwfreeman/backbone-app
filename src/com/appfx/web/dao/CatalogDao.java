package com.appfx.web.dao;


import com.appfx.web.pojo.CatalogData;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CatalogDao {

    public static List<CatalogData> getCatalogList() throws SQLException {
        Connection c = Database.getConnection();
        PreparedStatement s = null;

        String sql = "select item_number, item_name, description, thumbnail, price from appfx.catalog;";
        s = c.prepareStatement(sql);

        ResultSet rs = s.executeQuery();

        List<CatalogData> catalogDataList = new ArrayList<CatalogData>();

        while (rs.next()) {
            CatalogData catalogData = new CatalogData(rs.getString("item_number"), rs.getString("item_name"), rs.getString("description"), rs.getString("thumbnail"), rs.getString("price"));
            catalogDataList.add(catalogData);
        }

        Database.closeConnection(c, s, rs);
        return catalogDataList;
    }
}
