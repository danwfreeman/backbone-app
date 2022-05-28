package com.appfx.web.rest;

import com.appfx.web.pojo.UserSessionData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * get/set the session state using the UserSessionData
 */

@Path("/session")
public class Session {

    final static String key = Session.class.getName();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public UserSessionData getSessionData(@Context HttpServletRequest request) {
        UserSessionData userSessionData = UserSessionData.getSession(request);
        return userSessionData;
    }

    @DELETE
    public void removeSession(@Context HttpServletRequest request) {
        UserSessionData.removeSession(request);
    }


}
