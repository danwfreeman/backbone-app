package com.appfx.web.rest;

import com.appfx.web.dao.DeviceDao;
import com.appfx.web.dao.EmailDao;
import com.appfx.web.pojo.DeviceData;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

@Path("/device")
public class Device {

    private final static String key = DeviceData.class.getName();

    public static String getKey() {
        return key;
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public DeviceData addDevice(@Context HttpServletRequest request, DeviceData deviceData) throws SQLException {
        HttpSession session = request.getSession();

        deviceData = DeviceDao.addDevice(deviceData);

        return deviceData;
    }

    @DELETE
    @Path("/{id}")
    public void removeDevice(@Context HttpServletRequest request, @PathParam("id") String id) throws SQLException {
        DeviceDao.removeDevice(Long.valueOf(id));
    }

    @GET
    @Path("/criteria/{criteria}/type/{type}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DeviceData> getDeviceList(@Context HttpServletRequest request, @PathParam("criteria") String criteria, @PathParam("type") String type) {
        HttpSession session = request.getSession();
        List<DeviceData> list = null;

        try {
            list = DeviceDao.getDeviceList(criteria, type);
        } catch (SQLException e) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return list;
    }

    @GET
    @Path("/type/{type}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DeviceData> getDeviceList(@Context HttpServletRequest request, @PathParam("type") String type) {
        HttpSession session = request.getSession();
        List<DeviceData> list = null;

        try {
            list = DeviceDao.getDeviceList("", type);
        } catch (SQLException e) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return list;
    }


    @PUT
    @Path("/contact/item/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void sendEmail(@Context HttpServletRequest request, @PathParam("id") String id, DeviceData deviceData) {
        HttpSession session = request.getSession();
        EmailDao.sendContactSellerEmail(deviceData);
    }


}
