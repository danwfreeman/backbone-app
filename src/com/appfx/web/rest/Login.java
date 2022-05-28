package com.appfx.web.rest;

import com.appfx.web.dao.CredentialsDao;
import com.appfx.web.dao.UserInfoDao;
import com.appfx.web.pojo.CredentialsData;
import com.appfx.web.pojo.UserInfoData;
import com.appfx.web.pojo.UserSessionData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

@Path("/login")
public class Login {

    private final String key = CredentialsData.class.getName();


    @GET
    @Path("/auth/{pw}")
    public String authSite(@Context HttpServletRequest request, @PathParam("pw") String password) {
        if (!"bigbig".equals(password)) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        } else {
            return "OK";
        }
    }

    @GET
    @Path("/avail/{un}")
    public String isUsernameAvailable(@Context HttpServletRequest request, @PathParam("un") String username) {
        boolean exists = false;
        try {
            exists = CredentialsDao.userExists(username);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }

        return exists?"NOT_AVAIL":"AVAIL";

    }



    @GET
    @Path("/un/{un}/pw/{pw}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserSessionData validateUser(@Context HttpServletRequest request, @PathParam("un") String userName, @PathParam("pw") String password) {

        UserSessionData userSessionData = UserSessionData.getSession(request);
        CredentialsData credData = null;
        if (userSessionData.isAuthed()) {
            return userSessionData;
        }

        try {
            credData = CredentialsDao.getUser(userName, password);
            if (credData == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            userSessionData.setCredentialsData(credData);
            List<UserInfoData> userInfoList = UserInfoDao.getUserInfoList(credData.getId());
            userSessionData.setUserInfoDataList(userInfoList);
        } catch (SQLException e) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        return userSessionData;

//        List dataList = (List) session.getAttribute(key);
//        List<UserInfoData> userInfoList;
//        List<CartData> cartList;
//        CredentialsData credData = null;
//
//        if (dataList == null) {  // check DB
//            dataList = new ArrayList();
//            try {
//                credData = CredentialsDao.getUser(userName, password);
//                if (credData == null) {
//                    throw new WebApplicationException(Response.Status.UNAUTHORIZED);
//                }
//                userInfoList = UserInfoDao.getUserInfoList(credData.getId());
//                cartList = CartDao.getCartList(userName);
//                dataList.add(credData);
//                dataList.add(userInfoList);
//                dataList.add(cartList);
//            } catch (SQLException e) {
//                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
//            }
//            session.setAttribute(key, dataList);
//            session.setAttribute(Cart.getKey(), cartList);
//
//        }
//        return dataList;
    }


//    @GET
//    @Path("/un/{un}/token/{token}")
//    public List validateUserByToken(@Context HttpServletRequest request, @PathParam("un") String userName, @PathParam("token") String token) {
//        HttpSession session = request.getSession();
//        List dataList = (List) session.getAttribute(key);
//        List<UserInfoData> userInfoList;
//        List<CartData> cartList;
//        CredentialsData credData = null;
//
//        if (dataList == null) {  // check DB
//            dataList = new ArrayList();
//            try {
//                credData = CredentialsDao.getUserByToken(userName, token);
//                if (credData == null) {
//                    throw new WebApplicationException(Response.Status.UNAUTHORIZED);
//                }
//                userInfoList = UserInfoDao.getUserInfoList(credData.getId());
//                cartList = CartDao.getCartList(userName);
//                dataList.add(credData);
//                dataList.add(userInfoList);
//                dataList.add(cartList);
//            } catch (SQLException e) {
//                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
//            }
//            session.setAttribute(key, dataList);
//        }
//        return dataList;
//    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public CredentialsData addUser(@Context HttpServletRequest request, CredentialsData credentialsData) {
        UserSessionData userSessionData = UserSessionData.getSession(request);
        CredentialsData _credentialsData;

        if (userSessionData.getCredentialsData() == null) {
            try {
                _credentialsData = CredentialsDao.getUser(credentialsData.getEmail(), credentialsData.getPassword());
            } catch (SQLException e) {
                throw new WebApplicationException(Response.Status.NOT_ACCEPTABLE);  // can't add a user if it already exists
            }
            userSessionData.setCredentialsData(_credentialsData);
        } else {
            throw new WebApplicationException(Response.Status.NOT_ACCEPTABLE);  // can't add a user if it already exists
        }
        return _credentialsData;
    }
}

