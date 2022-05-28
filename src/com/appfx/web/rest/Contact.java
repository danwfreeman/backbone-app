package com.appfx.web.rest;

import com.appfx.web.dao.ContactDao;
import com.appfx.web.pojo.ContactData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;


@Path("/contact")
public class Contact {


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ContactData submitContactInfo(@Context HttpServletRequest request, ContactData contactData) throws SQLException {
        ContactData c = ContactDao.addContactInfo(contactData);

        // todo: email user confirmation, return error if email send fails for some reason

        return c;
    }


}