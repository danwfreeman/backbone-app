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
import java.util.List;

@Path("/user_info")
public class User {

    private final static String key = UserInfoData.class.getName();

    public static String getKey() {
        return key;
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserSessionData createUser(@Context HttpServletRequest request, UserInfoData userInfoData) throws Exception {
        UserSessionData userSessionData = UserSessionData.getSession(request);

        // search credentials table for existing user
        boolean userExists = CredentialsDao.userExists(userInfoData.getEmail());
        if (userExists) {
            throw new WebApplicationException(Response.Status.CONFLICT);
        }

        CredentialsData credentialsData = new CredentialsData();
        credentialsData.setEmail(userInfoData.getEmail());
        credentialsData.setPassword(userInfoData.getPassword());
        credentialsData = CredentialsDao.addUser(credentialsData);

        userSessionData.setCredentialsData(credentialsData);

        userInfoData.setCredentialsId(credentialsData.getId());
        UserInfoDao.createUser(userInfoData);

        userSessionData.addUserInfoItem(userInfoData);

        return userSessionData;
    }

    @POST
    @Path("/session/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserInfoData addSessionUserInfo(@Context HttpServletRequest request, UserInfoData userInfoData) {
        UserSessionData userSessionData = UserSessionData.getSession(request);

        userSessionData.addUserInfoItem(userInfoData);
        return userInfoData;
    }


    @POST
    @Path("/session/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserInfoData> addSessionUserInfo(@Context HttpServletRequest request, List<UserInfoData> userInfoDataList) {
        UserSessionData userSessionData = UserSessionData.getSession(request);

        userSessionData.addUserInfoItems(userInfoDataList);
        return userInfoDataList;

    }


    @PUT
    @Path("/session/list")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserInfoData> updateSessionUserInfo(@Context HttpServletRequest request, List<UserInfoData> userInfoDataList) {
        UserSessionData userSessionData = UserSessionData.getSession(request);

        userSessionData.updateUserInfoItems(userInfoDataList);
        return userInfoDataList;

    }


}
