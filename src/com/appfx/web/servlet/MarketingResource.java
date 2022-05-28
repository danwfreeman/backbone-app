package com.appfx.web.servlet;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class MarketingResource extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        ServletContext cntx = getServletContext();
        // Get the absolute path of the image

        String pathInfo = request.getPathInfo();
        if (!"/jobposting".equals(pathInfo) &&
                !"/appfxposting".equals(pathInfo) &&
                !"/opportunity".equals(pathInfo) &&
                !"/appfxopportunity".equals(pathInfo) &&
                !"/marketingopp".equals(pathInfo)) {

            response.getWriter().println("no image found at this location");
            return;
        }

        request.getRequestDispatcher("/marketing/marketing-resource.html").forward(request, response);
        return;

/*        String filename = cntx.getRealPath("/images/marketing/opportunity.jpg");
        String mime = cntx.getMimeType(filename);
        if (mime == null) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
        }

        response.setContentType(mime);
        File file = new File(filename);
        response.setContentLength((int) file.length());
        OutputStream out = response.getOutputStream();

        FileInputStream in = new FileInputStream(file);


        // Copy the contents of the file to the output stream
        byte[] buf = new byte[1024];
        int count = 0;
        while ((count = in.read(buf)) >= 0) {
            out.write(buf, 0, count);
        }
        out.close();
        in.close();
  */

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

    }

}
