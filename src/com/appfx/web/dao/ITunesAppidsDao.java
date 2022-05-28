package com.appfx.web.dao;


import java.sql.*;

public class ITunesAppidsDao {


    public static String getNextCode(long transactionId) throws SQLException {
        Connection c = Database.getConnection();
        PreparedStatement s = null;

        // get the next available number
        String sql = "select * from itunes_app_ids where transaction_id is null order by id limit 1";
        s = c.prepareStatement(sql);

        ResultSet rs = s.executeQuery();
        long id = 0;
        String appId = null;

        while  (rs.next()) {
            id = rs.getLong("id");
            appId = rs.getString("app_id");
        }



        rs.close();
        s.close();

        if (appId == null){
            // no codes left!
            // todo: log here
            Database.closeConnection(c);
            return "";
        }

        // update the record with the transaction id
        sql = "update itunes_app_ids set transaction_id = ? where id=?";
        PreparedStatement s2 = c.prepareStatement(sql, Statement.NO_GENERATED_KEYS);
        s2.setLong(1, transactionId);
        s2.setLong(2, id);

        s2.executeUpdate();

        Database.closeConnection(c, s2);
        return appId;

    }
}
