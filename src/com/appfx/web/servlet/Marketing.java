package com.appfx.web.servlet;


import com.appfx.web.dao.EmailDao;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Marketing extends HttpServlet {

    final List<String> fields = new ArrayList<String>();

    {
        fields.add("firstName");
        fields.add("middleName");
        fields.add("lastName");
        fields.add("address");
        fields.add("city");
        fields.add("state");
        fields.add("zip");
        fields.add("email");
        fields.add("phone");
        fields.add("territory");
        fields.add("hasCompany");
        fields.add("companyState");
        fields.add("canLift");
        fields.add("resume");
        fields.add("initials");
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        request.setAttribute("errorList", "null");
        request.setAttribute("init", "true");
        request.setAttribute("name", "''");
        request.setAttribute("entries", "null");

        String submit = request.getParameter("submit");
        if ("".equals(submit) || submit == null) {
            request.getRequestDispatcher("/marketing/marketing.jsp").forward(request, response);
            return;
        }
        request.setAttribute("init", "false");

        HashMap<String, String> entries = new HashMap<String, String>(15);

        for (String s : fields) {
            if ("canLift".equals(s) || "hasCompany".equals(s)){
                if (request.getParameter(s) != null){
                    entries.put(s, "true");
                }
            } else {
                entries.put(s, request.getParameter(s));
            }
        }

        ObjectMapper map = new ObjectMapper();
        // validate entry, add to error list if issues arise
        HashMap<String, String> errorList = validate(entries);
        if (errorList.size() == 0) {
            request.setAttribute("errorList", "null");
            request.setAttribute("name", "'" + entries.get("firstName") + " " + entries.get("lastName") +"'");
            try {
                sendEmail(entries);
            } catch (Exception e) {
                request.setAttribute("generalError", "true");
            }
            // send processed email
        } else {
            String errorlistJson = map.writeValueAsString(errorList);
            request.setAttribute("errorList", errorlistJson);
        }

        String entriesJson = map.writeValueAsString(entries);
        request.setAttribute("entries", entriesJson);


        request.getRequestDispatcher("/marketing/marketing.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        doGet(request, response);
    }

    private void sendEmail(HashMap<String, String> entries) throws Exception {
        EmailDao.sendSalesEmail(entries);
    }


    private HashMap<String, String> validate(HashMap<String, String> entries) {
        HashMap errorList = new HashMap<String, String>();


        for (String s : entries.keySet()) {
            if ("middleName".equals(s) || "hasCompany".equals(s) || "canLift".equals(s) || "companyState".equals(s)) {
                continue; // not required
            }

            boolean hasCompany = false;
            String entry = entries.get(s);

            if (entry == null || "".equals(entry)) {
                errorList.put(s, "This field is required.");
            }
        }

        // checkboxes have a null state if not checked
        if (entries.get("canLift") == null) {
            errorList.put("canLift", "This field is required.");
        }

        // do conditional require
        if (entries.get("hasCompany") != null) {
            if (entries.get("companyState") == null || "".equals(entries.get("companyState"))) {
                errorList.put("companyState", "This field is required if you have a company.");
            }

        }

        return errorList;
    }

}

