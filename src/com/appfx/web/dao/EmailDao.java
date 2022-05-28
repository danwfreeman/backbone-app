package com.appfx.web.dao;


import com.appfx.web.pojo.*;
import net.sf.jtpl.Template;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

public class EmailDao {
    //todo: get from file based on dev or prod
    private static final String username = "admin@appfxtoys.com";
    private static final String password = "appfx@615";
    private static final String baseFilePath = System.getProperty("user.home");

    private static final String LOGO_FILE_PATH = baseFilePath + "/appFX_final_whitebg_small.png";
    private static final String RECEIPT_TEMPLATE_FILE_PATH = baseFilePath + "/email_receipt.template";
    private static final String CONTACTUS_TEMPLATE_FILE_PATH = baseFilePath + "/email_contactus.template";
    private static final String SALES_TEMPLATE_FILE_PATH = baseFilePath + "/email_sales.template";
    private static final String CONTACT_SELLER_TEMPLATE_FILE_PATH = baseFilePath + "/contact_seller.template";

    private static Session init() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");


        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        return session;
    }

    public static boolean sendContactUsEmail(ContactData contactData) {
        Session session = init();

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(contactData.getEmail()));

            message.setSubject("AppFX thanks you for your input!");

            MimeMultipart multipart = new MimeMultipart("alternative");

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getContactUsTemplate(contactData), "text/html");
            multipart.addBodyPart(messageBodyPart, 0);

            message.setContent(multipart); // put everything together

            Transport.send(message);  // send the email

        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        } catch (FileNotFoundException ee) {
            ee.printStackTrace();
            return false;
        }
        return true;
    }


    public static boolean sendSalesEmail(HashMap<String, String> data) {
        Session session = init();

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("info@appfxtoys.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("dan@appfxtoys.com"));

            message.setSubject("New Marketing Associate Post");

            MimeMultipart multipart = new MimeMultipart("alternative");

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getSalesTemplate(data), "text/html");
            multipart.addBodyPart(messageBodyPart, 0);

            message.setContent(multipart); // put everything together

            Transport.send(message);  // send the email

        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        } catch (FileNotFoundException ee) {
            ee.printStackTrace();
            return false;
        }
        return true;
    }


    public static boolean sendReceiptEmail(OrderData orderData) {
        Session session = init();

        UserInfoData userShippingInfo = UserInfoDao.getType(UserInfoData.SHIPPING, orderData.getUserInfoDataList());


        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("admin@appfxtoys.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userShippingInfo.getEmail()));
            message.setSubject("Your AppFX Order");

            MimeMultipart multipart = new MimeMultipart("alternative");


            BodyPart imageBodyPart = new MimeBodyPart();
            DataSource fds = new FileDataSource(LOGO_FILE_PATH);
            imageBodyPart.setDataHandler(new DataHandler(fds));
            imageBodyPart.addHeader("Content-ID", "<logo>");
            imageBodyPart.addHeader("Content-Type", "image/png");
            multipart.addBodyPart(imageBodyPart, 0);

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getReceiptTemplate(orderData), "text/html");
            multipart.addBodyPart(messageBodyPart, 1);

            message.setContent(multipart); // put everything together

            Transport.send(message);  // send the email

        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        } catch (FileNotFoundException ee) {
            ee.printStackTrace();
            return false;
        }

        return true;
    }

    public static boolean sendContactSellerEmail(DeviceData deviceData) {
        Session session = init();

        try {
            Message message = new MimeMessage(session);
            String toEmail = CredentialsDao.getEmailForId(deviceData.getCredentialsId());
            if (toEmail == null){
                return false;
            }
            UserInfoData user = UserInfoDao.getRegisteredUser(deviceData.getCredentialsId());
            message.setFrom(new InternetAddress(deviceData.getEmail()));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));

            message.setSubject("Congratulations, you have a potential buyer for your device!");
            MimeMultipart multipart = new MimeMultipart("alternative");

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getContactSellerTemplate(deviceData, user), "text/html");
            multipart.addBodyPart(messageBodyPart, 0);

            message.setContent(multipart); // put everything together
            Transport.send(message);  // send the email

        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        } catch (FileNotFoundException ee) {
            ee.printStackTrace();
            return false;
        } catch (SQLException eee) {
            eee.printStackTrace();
            return false;
        }
        return true;
    }



    private static String getSalesTemplate(HashMap<String, String> data) throws FileNotFoundException {
        Template template = new Template(new File(SALES_TEMPLATE_FILE_PATH));

        for (String s : data.keySet()) {
            template.assign(s, data.get(s));
        }

        template.parse("main");
        return template.out();
    }


    private static String getContactUsTemplate(ContactData contactData) throws FileNotFoundException {
        Template template = new Template(new File(CONTACTUS_TEMPLATE_FILE_PATH));
        template.parse("main");
        return template.out();
    }

    private static String getContactSellerTemplate(DeviceData deviceData, UserInfoData user) throws FileNotFoundException {
        Template template = new Template(new File(CONTACT_SELLER_TEMPLATE_FILE_PATH));

        template.assign("first_name", user.getFirstName());
        template.assign("last_name", user.getLastName());
        template.assign("device_name", deviceData.getDeviceName());
        template.assign("device_description", deviceData.getDescription());
        template.assign("device_price", deviceData.getPrice());
        template.assign("buyer_email", deviceData.getEmail());
        template.assign("buyer_message", deviceData.getDeviceMessage());
        template.parse("main");
        return template.out();
    }


    private static String getReceiptTemplate(OrderData orderData) throws FileNotFoundException {
        UserInfoData userShippingInfo = UserInfoDao.getType(UserInfoData.SHIPPING, orderData.getUserInfoDataList());
        UserInfoData userBillingInfo = UserInfoDao.getType(UserInfoData.BILLING, orderData.getUserInfoDataList());
        Template template = new Template(new File(RECEIPT_TEMPLATE_FILE_PATH));

        template.assign("purchase_date", orderData.getPurchaseDate());
        template.assign("invoice_number", orderData.getInvoiceNumber());

        template.assign("shipping_email", userShippingInfo.getEmail());
        template.assign("shipping_first_name", userShippingInfo.getFirstName());
        template.assign("shipping_last_name", userShippingInfo.getLastName());
        template.assign("shipping_address1", userShippingInfo.getAddress1());
        template.assign("shipping_address2", userShippingInfo.getAddress2());
        template.assign("shipping_city", userShippingInfo.getCity());
        template.assign("shipping_region", userShippingInfo.getRegion());
        template.assign("shipping_country", userShippingInfo.getCountry());
        template.assign("shipping_postal", userShippingInfo.getPostal());

        template.assign("billing_email", userBillingInfo.getEmail());
        template.assign("billing_first_name", userBillingInfo.getFirstName());
        template.assign("billing_last_name", userBillingInfo.getLastName());
        template.assign("billing_address1", userBillingInfo.getAddress1());
        template.assign("billing_address2", userBillingInfo.getAddress2());
        template.assign("billing_city", userBillingInfo.getCity());
        template.assign("billing_region", userBillingInfo.getRegion());
        template.assign("billing_country", userBillingInfo.getCountry());
        template.assign("billing_postal", userBillingInfo.getPostal());

        List<CartData> cartDataList = orderData.getCartDataList();

        for (CartData c : cartDataList) {
            template.assign("quantity", c.getQuantity() + "");
            template.assign("item_name", c.getItemName());
            template.assign("item_description", c.getDescription());
            template.assign("total_item_cost", c.getTotal());
            template.parse("main.item");
        }

        template.assign("handling", orderData.getHandling());
        template.assign("grand_total", orderData.getGrandTotal());

        if (orderData.getItunesCode() != null) {
            if ("".equals(orderData.getItunesCode())) {
                template.assign("itunes_code", "(Sorry for the inconvenience. Please contact us and we will send your FX Driver free download code)");
            } else {
                template.assign("itunes_code", orderData.getItunesCode());
            }
            template.parse("main.itunescode");
        }

        template.parse("main");
        return template.out();

    }

}
