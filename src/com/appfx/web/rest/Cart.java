package com.appfx.web.rest;

import com.appfx.web.pojo.CartData;
import com.appfx.web.pojo.UserSessionData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/cart")
public class Cart {

    private final static String key = CartData.class.getName();

    public static String getKey() {
        return key;
    }


    /**
     * @deprecated use the session object to access the users full session data
     * @param request
     * @param userName
     * @return
     */
    @GET
    @Path("/user/{un}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<CartData> getCartList(@Context HttpServletRequest request, @PathParam("un") String userName) {
//        HttpSession session = request.getSession();
//        List<CartData> list = (List<CartData>) session.getAttribute(key);
//
//        if (list == null) {
//            try {
//                list = CartDao.getCartList(userName);
//            } catch (SQLException e) {
//                throw new WebApplicationException(Response.Status.NOT_FOUND);
//            }
//            session.setAttribute(key, list);
//        }
        return null;
    }

    @POST
    @Path("/item/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CartData addCartItem(@Context HttpServletRequest request, CartData cartData) throws SQLException {
        UserSessionData userSessionData = UserSessionData.getSession(request);
        // set the id to a unique id so backbone knows it's persisted
        cartData.setId(cartData.getItemNumber());
        cartData.setItemNumber(cartData.getItemNumber());
        userSessionData.addCartItem(cartData);
        return cartData;

    }

    @PUT
    @Path("/item/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public CartData setCartItemQuantity(@Context HttpServletRequest request, @PathParam("id") String id, CartData cartData) throws SQLException {

        UserSessionData userSessionData = UserSessionData.getSession(request);
        userSessionData.updateCartItem(cartData);
        return cartData;

    }

    @DELETE
    @Path("/item/{id}")
    public void deleteCartItem(@Context HttpServletRequest request, @PathParam("id") String id) throws Exception {

        UserSessionData userSessionData = UserSessionData.getSession(request);
        userSessionData.removeCartItem(id);
    }

    @DELETE
    @Path("/items/")
    public void deleteCartItems(@Context HttpServletRequest request) throws Exception {

        UserSessionData userSessionData = UserSessionData.getSession(request);
        userSessionData.removeCartItems();
    }


}
