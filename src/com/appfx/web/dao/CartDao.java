package com.appfx.web.dao;


import com.appfx.web.pojo.CartData;

import java.sql.*;
import java.util.List;

@Deprecated
public class CartDao {
    @Deprecated
    public static List<CartData> getCartList(String userName) throws SQLException {
//        Connection c = Database.getConnection();
//
//        PreparedStatement s = null;
//        String sql = "select cart.id, name, description, price, quantity, thumbnail, coupon_code, is_purchased, credentials_id from cart, credentials where cart.credentials_id = credentials.id and credentials.email = ?";
//        s = c.prepareStatement( sql);
//        s.setString(1, userName);
//        ResultSet rs = s.executeQuery();
//
//        List<CartData> cartList = new ArrayList<CartData>();
//        while (rs.next()) {
//            CartData cartData = new CartData(rs.getLong("id"), rs.getString("name"), rs.getString("description"), rs.getString("thumbnail"), rs.getString("coupon_code"), rs.getBoolean("is_purchased"), rs.getInt("credentials_id"), rs.getInt("quantity"), new Double(rs.getString("price")));
//            cartList.add(cartData);
//        }
//
//        Database.closeConnection(c, s, rs);
//
//        if (cartList.size() == 0) {
//            return null;
//        }
//        return cartList;
        return null;
    }

    @Deprecated
    public static CartData addItem(CartData cartData) throws SQLException {
//        Connection c = Database.getConnection();
//
//        String sql = "insert into cart (name, description, price, quantity, thumbnail, credentials_id) values (?, ?, ?, ?, ?, ?)";
//        PreparedStatement s = c.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
//        s.setString(1, cartData.getName());
//        s.setString(2, cartData.getDescription());
//        s.setString(3, String.valueOf(cartData.getPrice()));
//        s.setInt(4, cartData.getQuantity());
//        s.setString(5, cartData.getThumbnail());
//        s.setInt(6, cartData.getCredentialsId());
//
//        s.executeUpdate();
//
//        ResultSet rs = s.getGeneratedKeys();
//
//        int id = 0;
//        if (rs.next()) {
//            id = rs.getInt("GENERATED_KEY");
//        }
//
//        Database.closeConnection(c, s, rs);
//        cartData.setId(id);
//        return cartData;
        return null;
    }


    public static void updateItemQuantity(int itemId, int quantity) throws SQLException {
        //todo session data only

//        Connection c = Database.getConnection();
//
//        String sql = "update cart set quantity = ? where id=?";
//        PreparedStatement s = c.prepareStatement( sql, Statement.NO_GENERATED_KEYS);
//        s.setInt(1, itemId);
//        s.setInt(2, quantity);
//
//        s.executeUpdate();
//
//        Database.closeConnection(c, s);
    }

    public static void deleteItem(int itemId) throws SQLException {
//        Connection c = Database.getConnection();
//
//        String sql = "delete from cart where id= ?";
//        PreparedStatement s = c.prepareStatement( sql, Statement.NO_GENERATED_KEYS);
//        s.setInt(1, itemId);
//
//        s.executeUpdate();
//        Database.closeConnection(c, s);
    }

}
