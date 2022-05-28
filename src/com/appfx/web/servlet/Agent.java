package com.appfx.web.servlet;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Agent extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        Boolean isLogin = (Boolean)request.getSession().getAttribute("login");
        if (Boolean.TRUE.equals(isLogin)){
            request.getRequestDispatcher("/WEB-INF/marketing/agent.jsp").forward(request, response);
        } else{
            request.getRequestDispatcher("/marketing/").forward(request, response);
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        doGet(request, response);
    }


}

