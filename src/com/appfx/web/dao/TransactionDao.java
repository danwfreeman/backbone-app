package com.appfx.web.dao;


import com.appfx.web.pojo.TransactionData;
import com.appfx.web.pojo.TransactionItemData;

import java.sql.*;

public class TransactionDao {

    public static TransactionData addTransaction(TransactionData data) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "insert into transaction (credentials_id, is_purchased, total_amount) values (?, ?, ?)";

        PreparedStatement s = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        s.setInt(1, data.getCredentialsId());
        s.setBoolean(2, data.isPurchased());
        s.setString(3, data.getTotalAmount());
        s.executeUpdate();

        ResultSet rs = s.getGeneratedKeys();

        int id = 0;
        if (rs.next()) {
            id = rs.getInt("GENERATED_KEY");
        }
        data.setId(id);
        Database.closeConnection(c, s, rs);
        return data;
    }

    public static TransactionItemData addTransactionItem(TransactionItemData transactionItemData) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "insert into transaction_item (transaction_id, item_number, quantity, coupon_code, amount) values (?, ?, ?, ?, ?)";
        PreparedStatement s = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        s.setInt(1, transactionItemData.getTransactionId());
        s.setString(2, transactionItemData.getItemNumber());
        s.setInt(3, transactionItemData.getQuantity());
        s.setString(4, transactionItemData.getCouponCode());
        s.setString(5, transactionItemData.getAmount());
        s.executeUpdate();
        ResultSet rs = s.getGeneratedKeys();

        int id = 0;
        if (rs.next()) {
            id = rs.getInt("GENERATED_KEY");
        }
        transactionItemData.setId(id);

        Database.closeConnection(c, s, rs);
        return transactionItemData;
    }


    public static TransactionData setTransactionPurchased(TransactionData data) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "update transaction set is_purchased = ? where id=?";
        PreparedStatement s = c.prepareStatement(sql, Statement.NO_GENERATED_KEYS);
        s.setBoolean(1, data.isPurchased());
        s.setLong(2, data.getId());

        s.executeUpdate();

        Database.closeConnection(c, s);
        return data;
    }


    public static TransactionData setTransactionTrackingNumber(TransactionData data) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "update transaction set tracking_number = ? where id=?";
        PreparedStatement s = c.prepareStatement(sql, Statement.NO_GENERATED_KEYS);
        s.setString(1, data.getTrackingNumber());
        s.setLong(2, data.getId());

        s.executeUpdate();

        Database.closeConnection(c, s);
        return data;

    }
}
