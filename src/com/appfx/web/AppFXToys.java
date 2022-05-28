package com.appfx.web;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AppFXToys extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        System.out.println("in main servlet");

        String agent = request.getHeader("User-Agent");

        // todo: read get param and direct to mobile or desktop depending

        if (agent.toLowerCase().contains("mobile")) {
            response.sendRedirect("/mobile/");
        } else {
            response.sendRedirect("/");
        }


    }
}

