package com.appfx.web.dao;


import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;


public class Database {

    //private static Connection connection;
    private static DataSource dataSource;

    public static void main(String[] args) {
//        Connection c = Database.getConnection();
//        Statement statement = null;
//        try {
//            statement = c.createStatement();
//        } catch (SQLException e) {
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//        }
//        // Result set get the result of the SQL query
//        try {
//            ResultSet resultSet = statement.executeQuery("select * from user_info");
//            resultSet.next();
//            System.out.println(resultSet.getString("first_name"));
//        } catch (SQLException e) {
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//        }
    }


    public static synchronized Connection getConnection() {
//        String url = "jdbc:mysql://localhost:3306/";
//        String dbName = "appfx";
//        String driver = "com.mysql.jdbc.Driver";
//        String userName = "root";
//        String password = "mustang4u2";

        if (dataSource != null) {
            try {
                return dataSource.getConnection();
            } catch (SQLException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                return null;
            }
        }

        // otherwise, setup the db pooling

        Properties prop = new Properties();

        try {
            prop.load(new FileInputStream(System.getProperty("user.home") + "/appfx_db.cfg"));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        String host = prop.getProperty("host").toString();
        String userName = prop.getProperty("username").toString();
        String password = prop.getProperty("password").toString();
        String driver = prop.getProperty("driver").toString();

        PoolProperties p = new PoolProperties();
        p.setUrl(host);
        p.setDriverClassName(driver);
        p.setUsername(userName);
        p.setPassword(password);
        p.setJmxEnabled(true);
        p.setTestWhileIdle(false);
        p.setTestOnBorrow(true);
        p.setValidationQuery("SELECT 1");
        p.setTestOnReturn(false);
        p.setValidationInterval(30000);
        p.setTimeBetweenEvictionRunsMillis(30000);
        p.setMaxActive(100);
        p.setInitialSize(10);
        p.setMaxWait(10000);
        p.setRemoveAbandonedTimeout(60);
        p.setMinEvictableIdleTimeMillis(30000);
        p.setMinIdle(10);
        p.setLogAbandoned(true);
        p.setRemoveAbandoned(true);
//        p.setJdbcInterceptors(
//                "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
//                        "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
        dataSource = new DataSource();
        dataSource.setPoolProperties(p);


//        try {
//            Class.forName(driver).newInstance();
//            connection = DriverManager.getConnection(host, userName, password);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return null;
        }
    }


    public static void closeConnection(Connection c) {
        closeConnection(c, null, null);
    }


    public static void closeConnection(Connection c, PreparedStatement s) {
        closeConnection(c, s, null);
    }

    public static void closeConnection(Connection c, PreparedStatement s, ResultSet rs) {
        try {
            if (rs != null) rs.close();
            if (s != null) s.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (c != null) try {
                c.close();
            } catch (Exception ee) {
                ee.printStackTrace();
            }
        }

    }
}
