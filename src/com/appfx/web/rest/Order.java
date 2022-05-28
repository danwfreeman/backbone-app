package com.appfx.web.rest;


import com.appfx.web.pojo.CartData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("/order")
public class Order {


    @GET
    @Path("/auth/{pw}")
    public String authSite(@Context HttpServletRequest request, @PathParam("pw") String password) {
        return "OK";
    }

    @POST
    @Path("/final/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CartData finalizeOrder(@Context HttpServletRequest request, CartData cartData) throws SQLException {
//        HttpSession session = request.getSession();
//
        return new CartData();

    }
}
