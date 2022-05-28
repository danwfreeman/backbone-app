package com.appfx.web.dao;

import com.appfx.web.pojo.CredentialsData;

import java.sql.*;

public class CredentialsDao extends GenericDao {

    public static boolean userExists(String email) throws SQLException{
        Connection c = Database.getConnection();

        String sql = "select id, email, token from credentials where email = ?";
        PreparedStatement s = c.prepareStatement( sql);
        s.setString(1, email);
        ResultSet rs = s.executeQuery();

        if (rs.next() == false){
            return false;
        }
        Database.closeConnection(c, s, rs);
        return true;
    }

    public static String getEmailForId(int id) throws SQLException{
        String email = null;
        Connection c = Database.getConnection();

        String sql = "select email from credentials where id= ?";
        PreparedStatement s = c.prepareStatement( sql);
        s.setInt(1, id);
        ResultSet rs = s.executeQuery();

        if (rs.next() == true){
            email = rs.getString("email");
        }
        Database.closeConnection(c, s, rs);
        return email;
    }


    public static int getId(String email) throws SQLException{
        Connection c = Database.getConnection();

        String sql = "select id from credentials where email = ?";
        PreparedStatement s = c.prepareStatement( sql);
        s.setString(1, email);
        ResultSet rs = s.executeQuery();

        int credId = -1;

        if (rs.next() == true){
            credId = rs.getInt("id");
        }

        Database.closeConnection(c, s, rs);
        return credId;
    }

    public static CredentialsData getUser(String email, String password) throws SQLException {
        Connection c = Database.getConnection();

        String sql = "select id, email, is_guest from credentials where email = ? and password = ?";
        PreparedStatement s = c.prepareStatement( sql);
        s.setString(1, email);
        s.setString(2, password);
        ResultSet rs = s.executeQuery();

        if (rs.next() == false){
            return null;  // no match in db
        }
        CredentialsData credentialsData = new CredentialsData(rs.getInt("id"), email, password, rs.getBoolean("is_guest"));
        Database.closeConnection(c, s, rs);

        return credentialsData;
    }

    public static CredentialsData addUser(CredentialsData credentialsData) throws SQLException {
        String sql = "insert into credentials (email, password, is_guest) values (?, ?, ?);";
        Connection c = Database.getConnection();

        PreparedStatement s = c.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS);
        s.setString(1, credentialsData.getEmail());
        s.setString(2, credentialsData.getPassword());
        s.setBoolean(3, credentialsData.isGuest());

        int r = s.executeUpdate();
        ResultSet rs = s.getGeneratedKeys();

        int id = 0;
        if(rs.next()){
            id = rs.getInt("GENERATED_KEY");
        }
        Database.closeConnection(c, s, rs);
        credentialsData.setId(id);
        return credentialsData;

    }

    /**
     * case of cookie 'remember me' login
     * @param email
     * @param token
     * @return
     */
//    public static CredentialsData getUserByToken(String email, String token) throws SQLException {
//        Connection c = Database.getConnection();
//
//        String sql = "select id, email, token, is_guest from credentials where token = ? and email = ?";
//        PreparedStatement s = c.prepareStatement( sql);
//        s.setString(1, token);
//        s.setString(2, email);
//
//        ResultSet rs = s.executeQuery();
//
//        if (rs.next() == false){
//            return null;  // no match in db
//        }
//
//        CredentialsData credentialsData = new CredentialsData(rs.getInt("id"), email, "", token, rs.getBoolean("is_guest"));
//        Database.closeConnection(c, s, rs);
//        return credentialsData;
//    }

    public static CredentialsData resetPassword(String userName, String oldPassword, String newPassword) {
        // !! invalidate token - set to empty string as it's not tied to the password anymore

        return null;
    }
}
