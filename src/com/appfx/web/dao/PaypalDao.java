package com.appfx.web.dao;


import com.appfx.web.pojo.OrderData;
import com.appfx.web.pojo.PaymentData;
import com.appfx.web.pojo.UserInfoData;
import urn.ebay.api.PayPalAPI.DoDirectPaymentReq;
import urn.ebay.api.PayPalAPI.DoDirectPaymentRequestType;
import urn.ebay.api.PayPalAPI.DoDirectPaymentResponseType;
import urn.ebay.api.PayPalAPI.PayPalAPIInterfaceServiceService;
import urn.ebay.apis.CoreComponentTypes.BasicAmountType;
import urn.ebay.apis.eBLBaseComponents.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class PaypalDao {

    private static final File payPalConfig = new File(System.getProperty("user.home") + "/paypal_config.properties");

    public static PalpalResponse submit(OrderData orderData) {

        UserInfoData billing = UserInfoDao.getType(UserInfoData.BILLING, orderData.getUserInfoDataList());
        PaymentData paymentData = orderData.getPaymentData();


        DoDirectPaymentReq doPaymentReq = new DoDirectPaymentReq();
        DoDirectPaymentRequestType pprequest = new DoDirectPaymentRequestType();
        DoDirectPaymentRequestDetailsType details = new DoDirectPaymentRequestDetailsType();
        PaymentDetailsType paymentDetails = new PaymentDetailsType();

        BasicAmountType amount = new BasicAmountType();
        amount.setValue(orderData.getGrandTotal());
        amount.setCurrencyID(CurrencyCodeType.fromValue("USD")); // todo: infer
        paymentDetails.setOrderTotal(amount);

        AddressType shipTo = new AddressType();
        shipTo.setName(billing.getFirstName() + " " + billing.getLastName());
        shipTo.setStreet1(billing.getAddress1());
        shipTo.setStreet2(billing.getAddress2());
        shipTo.setCityName(billing.getCity());
        shipTo.setStateOrProvince(billing.getRegion());
        shipTo.setCountry(CountryCodeType.fromValue("US"));  // todo: get from client, or lookup table
        shipTo.setPostalCode(billing.getPostal());
        paymentDetails.setShipToAddress(shipTo);

        details.setPaymentDetails(paymentDetails);

        CreditCardDetailsType cardDetails = new CreditCardDetailsType();
        cardDetails.setCreditCardType(CreditCardTypeType.fromValue(paymentData.getType()));
        cardDetails.setCreditCardNumber(paymentData.getNumber());
        cardDetails.setExpMonth(Integer.parseInt(paymentData.getExpiryMonth()));
        cardDetails.setExpYear(Integer.parseInt(paymentData.getExpiryYear()));
        cardDetails.setCVV2(paymentData.getCvv());

        PayerInfoType payer = new PayerInfoType();
        PersonNameType name = new PersonNameType();
        name.setFirstName(billing.getFirstName());
        name.setLastName(billing.getLastName());
        payer.setPayerName(name);
        payer.setPayerCountry(CountryCodeType.fromValue("US"));  // todo: get from lookup table
        payer.setAddress(shipTo);

        cardDetails.setCardOwner(payer);

        details.setCreditCard(cardDetails);

        details.setIPAddress(orderData.getRemoteAddress());
        details.setPaymentAction(PaymentActionCodeType.fromValue("Sale")); // todo: get from enum

        PalpalResponse response = new PalpalResponse();

        pprequest.setDoDirectPaymentRequestDetails(details);
        doPaymentReq.setDoDirectPaymentRequest(pprequest);


        try {
            PayPalAPIInterfaceServiceService service = new PayPalAPIInterfaceServiceService(payPalConfig);
            DoDirectPaymentResponseType ddresponse = service.doDirectPayment(doPaymentReq);
            System.out.println("response " + ddresponse);
            //service.getTransactionDetails();

            response.ackCode = ddresponse.getAck();
            response.setErrors(ddresponse.getErrors());
            response.correlationID = ddresponse.getCorrelationID();
            response.transactionID = ddresponse.getTransactionID();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;

    }

    public static class PalpalResponse {
        public AckCodeType ackCode;
        public List<String> errors = new ArrayList<String>();
        public String correlationID;
        public String transactionID;

        public void setErrors(List<ErrorType> errorTypes) {
            for (ErrorType e : errorTypes) {
                errors.add(e.getLongMessage());
            }
        }

    }

}


