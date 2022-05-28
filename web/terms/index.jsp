<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%


  String agent = request.getHeader("User-Agent");
  String site = request.getParameter("site");

  if (agent.toLowerCase().contains("mobile") && "standard".equals(site) == false) {
    response.sendRedirect("/mobile/#terms");
  } else {
    response.sendRedirect("/#terms");
  }

%>