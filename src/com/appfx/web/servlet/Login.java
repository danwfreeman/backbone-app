package com.appfx.web.servlet;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Login extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        request.setAttribute("error", "false");

        String login = request.getParameter("login");
        String userName = request.getParameter("username");
        String password = request.getParameter("password");

        if ("login".equals(login)) {
            if ("agent".equals(userName) && "hello".equals(password)) {
                request.getSession().setAttribute("login", true);
                request.getRequestDispatcher("/marketing/agent").forward(request, response);
                return;
            } else {
                request.setAttribute("error", "true");
            }
        }

        request.getRequestDispatcher("/marketing/landing.jsp").forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        doGet(request, response);
    }


}

