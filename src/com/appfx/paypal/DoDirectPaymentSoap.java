package com.appfx.paypal;

import com.paypal.exception.*;
import com.paypal.sdk.exceptions.OAuthException;
import org.xml.sax.SAXException;
import urn.ebay.api.PayPalAPI.DoDirectPaymentReq;
import urn.ebay.api.PayPalAPI.DoDirectPaymentRequestType;
import urn.ebay.api.PayPalAPI.DoDirectPaymentResponseType;
import urn.ebay.api.PayPalAPI.PayPalAPIInterfaceServiceService;
import urn.ebay.apis.CoreComponentTypes.BasicAmountType;
import urn.ebay.apis.eBLBaseComponents.*;

import javax.servlet.ServletException;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;

public class DoDirectPaymentSoap {

    private static final long serialVersionUID = 12345456723541232L;

    public DoDirectPaymentSoap() {
    }

//    protected void doGet(HttpServletRequest req, HttpServletResponse res)
//            throws ServletException, IOException {
//        getServletConfig().getServletContext()
//                .getRequestDispatcher("/DirectPayment/DoDirectPayment.jsp")
//                .forward(req, res);
//    }

    public static void main (String arg[]) throws Exception{
        DoDirectPaymentSoap ddp = new DoDirectPaymentSoap();
        ddp.submit();
    }


    protected void submit() throws ServletException, IOException {

        String amountValue="23";
        String currencyCode="USD";
        String firstName="bob";
        String lastName="jones";
        String address1="388 apfx blvd";
        String address2="suite 2";
        String city="Seattle";
        String state="WA";
        String countryCode="US";
        String zip="sdsd1";
        String creditCardType="Discover";
        String creditCardNumber="6221199125770255";
        String expDateMonth="11";
        String expDateYear="2014";
        String cvv2Number="001";
        String paymentType="Sale";

        DoDirectPaymentReq doPaymentReq = new DoDirectPaymentReq();
        DoDirectPaymentRequestType pprequest = new DoDirectPaymentRequestType();
        DoDirectPaymentRequestDetailsType details = new DoDirectPaymentRequestDetailsType();
        PaymentDetailsType paymentDetails = new PaymentDetailsType();

        BasicAmountType amount = new BasicAmountType();
        amount.setValue(amountValue);
        amount.setCurrencyID(CurrencyCodeType.fromValue(currencyCode));
        paymentDetails.setOrderTotal(amount);

        AddressType shipTo = new AddressType();
        shipTo.setName(firstName + " " + lastName);
        shipTo.setStreet1(address1);
        shipTo.setStreet2(address2);
        shipTo.setCityName(city);
        shipTo.setStateOrProvince(state);
        shipTo.setCountry(CountryCodeType.fromValue(countryCode));
        shipTo.setPostalCode(zip);
        paymentDetails.setShipToAddress(shipTo);

        details.setPaymentDetails(paymentDetails);

        CreditCardDetailsType cardDetails = new CreditCardDetailsType();
        cardDetails.setCreditCardType(CreditCardTypeType.fromValue(creditCardType));
        cardDetails.setCreditCardNumber(creditCardNumber);
        cardDetails.setExpMonth(Integer.parseInt(expDateMonth));
        cardDetails.setExpYear(Integer.parseInt(expDateYear));
        cardDetails.setCVV2(cvv2Number);

        PayerInfoType payer = new PayerInfoType();
        PersonNameType name = new PersonNameType();
        name.setFirstName(firstName);
        name.setLastName(lastName);
        payer.setPayerName(name);
        payer.setPayerCountry(CountryCodeType.fromValue(countryCode));
        payer.setAddress(shipTo);

        cardDetails.setCardOwner(payer);

        details.setCreditCard(cardDetails);

        details.setIPAddress("71.59.145.254");
        details.setPaymentAction(PaymentActionCodeType.fromValue(paymentType));

        pprequest.setDoDirectPaymentRequestDetails(details);
        doPaymentReq.setDoDirectPaymentRequest(pprequest);

        try {
            //File f = new File("./web/WEB-INF/sdk_config.properties");
            File f = new File (System.getProperty("user.home") + "/sdk_config.properties");
            //PayPalAPIInterfaceServiceService service = new PayPalAPIInterfaceServiceService(this.getServletContext().getRealPath("/") + "/WEB-INF/sdk_config.properties");
            PayPalAPIInterfaceServiceService service = new PayPalAPIInterfaceServiceService(f);
            DoDirectPaymentResponseType ddresponse = service.doDirectPayment(doPaymentReq);
            //service.getTransactionDetails()

            System.out.println("response " + ddresponse);

//            res.setContentType("text/html");
//            if (ddresponse != null) {
//                session.setAttribute("lastReq", service.getLastRequest());
//                session.setAttribute("lastResp", service.getLastResponse());
//                if (ddresponse.getAck().toString().equalsIgnoreCase("SUCCESS")) {
//                    Map<Object, Object> map = new LinkedHashMap<Object, Object>();
//                    map.put("Ack", ddresponse.getAck());
//                    map.put("Transaction ID", ddresponse.getTransactionID());
//                    map.put("Amount", ddresponse.getAmount().getValue() + " "
//                            + ddresponse.getAmount().getCurrencyID());
//                    map.put("Payment Status", ddresponse.getPaymentStatus());
//                    session.setAttribute("map", map);
//                    res.sendRedirect("/merchant-sample/Response.jsp");
//                } else {
//                    session.setAttribute("Error", ddresponse.getErrors());
//                    res.sendRedirect("/merchant-sample/Error.jsp");
//                }
//            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SSLConfigurationException e) {
            e.printStackTrace();
        } catch (InvalidCredentialException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (HttpErrorException e) {
            e.printStackTrace();
        } catch (InvalidResponseDataException e) {
            e.printStackTrace();
        } catch (ClientActionRequiredException e) {
            e.printStackTrace();
        } catch (MissingCredentialException e) {
            e.printStackTrace();
        } catch (OAuthException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
