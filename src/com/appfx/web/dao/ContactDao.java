package com.appfx.web.dao;

import com.appfx.web.pojo.ContactData;

import java.sql.*;

public class ContactDao {

    public static ContactData addContactInfo(ContactData contactData) throws SQLException {
        String sql = "insert into contact_us (first_name, last_name, email, message) values (?, ?, ?, ?);";
        Connection c = Database.getConnection();

        PreparedStatement s = c.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS);
        s.setString(1, contactData.getFirstName());
        s.setString(2, contactData.getLastName());
        s.setString(3, contactData.getEmail());
        s.setString(4, contactData.getMessage());

        int r = s.executeUpdate();
        ResultSet rs = s.getGeneratedKeys();

        int id = 0;
        if(rs.next()){
            id = rs.getInt("GENERATED_KEY");
        }
        Database.closeConnection(c, s, rs);
        contactData.setId(id);

        EmailDao.sendContactUsEmail(contactData);

        return contactData;

    }

}
