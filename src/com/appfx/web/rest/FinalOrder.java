package com.appfx.web.rest;

import com.appfx.web.dao.*;
import com.appfx.web.pojo.*;
import com.appfx.web.util.AppUtils;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Path("/txn")
public class FinalOrder {

    @GET
    @Path("/final/handling")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getHandlingAmount(@Context HttpServletRequest request, OrderData orderData) throws SQLException {
        String amount = AppUtils.getShippingForOrder(orderData);

        return amount;
    }


    @POST
    @Path("/final/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public OrderData postTransaction(@Context HttpServletRequest request, OrderData orderData) throws SQLException {
        /**
         *
         * Order of operations:
         *  1. save user info data - create credentials entry - will need for failed paypal purchase
         *  2. if coupon code exists, validate again so it's bound with order
         *  3. execute paypal transaction, on success:
         *      - integrate with tracking api
         *      - add each item to transaction table with credential id and coupon code if provided and shipping tracking number
         *      - email success and thank you email with shipping tracking number
         *      - update session data for this user with empty cart
         *     on failure:
         *      - show failure reason on screen - any need for email??
         *
         */

        int credentialsId = persistUserInfo(orderData.getUserInfoDataList());

        // make sure our transaction has the price data from the database not the web browser
        setItemPriceFromCatalog(orderData.getCartDataList());
        setLineItemTotal(orderData.getCartDataList());

        if (orderData.getCouponCode() != null) {
            // exit with error if not a valid coupon code
            String couponCode = orderData.getCouponCode();
            couponCode = couponCode.toLowerCase();
            //todo removing leading and trailing white space

            List<CouponData> couponData = validateCouponCode(couponCode);
            if (couponData == null) {
                throw new WebApplicationException(Response.Status.PRECONDITION_FAILED);
            }

            // search for valid items and update cart items in session
            applyEligibleCouponItems(orderData.getCartDataList(), couponData);
        }

        // calculate shipping and total amounts on orderData
        orderData.setHandling(AppUtils.getShippingForOrder(orderData));
        orderData.setGrandTotal(getTotalAmount(orderData.getCartDataList(), orderData.getHandling()));
        SimpleDateFormat df = new SimpleDateFormat("MM-dd-yyyy");
        orderData.setPurchaseDate(df.format(new Date()));

        // save transaction data -
        TransactionData transactionData = saveTransactionData(orderData, credentialsId);

        // test for complete package code, if used get next id and mark as used
        if (AppUtils.hasCompletePackageItem(orderData.getCartDataList())) {
            String itunesCode = ITunesAppidsDao.getNextCode(transactionData.getId());
            orderData.setItunesCode(itunesCode);
        }


        // adds in shipping amount calculated in saveTransactionData()
        orderData.setRemoteAddress(request.getRemoteAddr());
        orderData.setInvoiceNumber(String.valueOf(transactionData.getId()));
        //if (executePaypal(orderData) == false){
        if (executeFakePaypal(orderData) == false) {
            return orderData;  // exit function, transaction failed
        }


        // todo: deal with shipping tracking number here: interface with usps
        // todo: for now set an arbitrary number in orderData
        // todo: endicia will post this back
        boolean hasTracking = true;
        String trackingNumber = "";


        // update transaction data flag as successful paypay purchase - is_purchased flag
        setTransactionPurchased(transactionData);

        if (hasTracking) {
            setTransactionTrackingNumber(transactionData, trackingNumber);
            orderData.setTrackingNumber(trackingNumber); // convenience method for tracking number
        }


        //todo: email user transaction info with tracking number if it was successful and a note of how to track if it was not successful - whatever that may be
        //todo: probably me emailing them manually
        boolean emailSent = EmailDao.sendReceiptEmail(orderData);

        orderData.setPaymentData(null); // don't show cc stuff
        orderData.setEmailSent(emailSent);

        UserSessionData userSessionData = UserSessionData.getSession(request);
        userSessionData.getCartDataList().clear(); // empty purchased cart

        return orderData;
    }

    private boolean executeFakePaypal(OrderData orderData) {
        orderData.setPayPalErrorCode("Success");
        return true;
    }


    private boolean executePaypal(OrderData orderData) {
        PaypalDao.PalpalResponse paypalResponse;
        try {
            paypalResponse = PaypalDao.submit(orderData);
        } catch (Exception e) {
            e.printStackTrace();
            // something went poorly, return general error to client
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }

        // if not success or successwithwarning, then return an error to the client
        // is the js structure sent to the client here?
        if (paypalResponse.ackCode == null) {
            //todo: log timeout error
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }

        orderData.setPayPalErrorCode(paypalResponse.ackCode.getValue());
        orderData.setPayPalErrorList(paypalResponse.errors);

        if (!paypalResponse.ackCode.getValue().equals("Success") && !paypalResponse.ackCode.getValue().equals("SuccessWithWarning")) {
            return false;
        }
        return true;
    }

    private void setItemPriceFromCatalog(List<CartData> cartDataList) throws SQLException {
        List<CatalogData> catalogList = AppUtils.getCatalog();
        for (CartData c : cartDataList) {
            c.setPrice(AppUtils.getPriceForID(c.getItemNumber()));
        }
    }

    private void setLineItemTotal(List<CartData> cartDataList) throws SQLException {
        List<CatalogData> catalogList = AppUtils.getCatalog();

        for (CartData c : cartDataList) {
            BigDecimal lineItemTotal = getAmount(c.getQuantity(), c.getPrice());
            c.setTotal(lineItemTotal.toString());
        }
    }

    private TransactionData saveTransactionData(OrderData orderData, int credentialsId) throws SQLException {
        TransactionData transactionData = new TransactionData();
        TransactionItemData transactionItemData = null;

        transactionData.setCredentialsId(credentialsId);
        transactionData.setPurchased(false);
        transactionData.setTotalAmount(orderData.getGrandTotal());  // this includes the shipping fee based on the order's region and items

        TransactionDao.addTransaction(transactionData);

        for (CartData c : orderData.getCartDataList()) {
            transactionItemData = new TransactionItemData();
            transactionItemData.setItemNumber(c.getItemNumber());
            transactionItemData.setQuantity(c.getQuantity());
            transactionItemData.setCouponCode(c.getCouponCode());    // discount already applied at this point if coupon code was valid
            transactionItemData.setAmount(c.getTotal());
            transactionItemData.setTransactionId(transactionData.getId());
            transactionData.addTransactionItemData(transactionItemData);
            TransactionDao.addTransactionItem(transactionItemData);
        }
        return transactionData;
    }

    private void setTransactionPurchased(TransactionData transactionData) throws SQLException {
        transactionData.setPurchased(true);
        TransactionDao.setTransactionPurchased(transactionData);
    }


    private void setTransactionTrackingNumber(TransactionData transactionData, String trackingNumber) throws SQLException {
        transactionData.setTrackingNumber(trackingNumber);
        TransactionDao.setTransactionTrackingNumber(transactionData);
    }


    private BigDecimal getAmount(int quantity, String price) {
        BigDecimal q = new BigDecimal(quantity);
        BigDecimal p = new BigDecimal(price);

        return q.multiply(p);
    }

    // add line items and the handling charge
    private String getTotalAmount(List<CartData> cartDataList, String handling) {
        BigDecimal total = new BigDecimal(0);
        for (CartData c : cartDataList) {
            BigDecimal sum = new BigDecimal(c.getQuantity()).multiply(new BigDecimal(c.getPrice()));
            c.setTotal(sum.toString()); // reset cart total to calculated amount
            total = total.add(sum);
        }

        total = total.add(new BigDecimal(handling));
        return total.toString();
    }


    /**
     * iterate over cart item list and apply coupon codes to each, adjust price here
     *
     * @param cartList
     * @param couponData
     */
    private void applyEligibleCouponItems(List<CartData> cartList, List<CouponData> couponData) {
        for (CartData d : cartList) {
            String id = d.getItemNumber();
            AppUtils.applyEligibleDiscount(d, couponData);
        }
    }



    @GET
    @Path("/coupon/{couponCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<CouponData> validCouponCode(@Context HttpServletRequest request, @PathParam("couponCode") String couponCode) {
        List<CouponData> couponData = null;
        try {
            couponData = validateCouponCode(couponCode);
        } catch (SQLException e) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        if (couponData == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }

        UserSessionData userSessionData = UserSessionData.getSession(request);
        applyEligibleCouponItems(userSessionData.getCartDataList(), couponData);

        return couponData;
    }


    // just validate also called by UI on ajax call before purchase is made
    private List<CouponData> validateCouponCode(String couponCode) throws SQLException {
        return CouponDao.isValidCode(couponCode);
    }

    private int persistUserInfo(List<UserInfoData> userInfoDataList) throws SQLException {
        // check if type is R - therefore reg'd and credentials exists - retrieve credentials id via email
        // otherwise: guest, may be returning guest, lookup credentials id by email off B
        // _ denotes database object

        // if R, get cred id via email from R
        //    - get user info list via credID
        //    - update objects for B and S
        //      - if they don't exist, throw exception
        // if no R, then:
        //    - get B and S objects via email query on user info table
        //      - if they don't exist from client, throw exception
        //    - either create C, B, S or update B, S

        if (isValidUserInfo(userInfoDataList) == false) {
            throw new WebApplicationException(Response.Status.NOT_ACCEPTABLE);
        }

        int _credentialsId = -1;

        // db objects
        UserInfoData _billing = null;
        UserInfoData _shipping = null;

        // client/js objects
        UserInfoData shipping = UserInfoDao.getType(UserInfoData.SHIPPING, userInfoDataList);
        UserInfoData billing = UserInfoDao.getType(UserInfoData.BILLING, userInfoDataList);


        UserInfoData regData = UserInfoDao.getType(UserInfoData.REGISTRATION, userInfoDataList);
        if (regData != null) {  // update user info to what the user may have entered for this transaction
            _credentialsId = CredentialsDao.getId(regData.getEmail());
            //todo: match _credentialsId with js object credentialsId, throw error if they don't match
            UserInfoDao.updateUser(new UserInfoData(shipping));
            UserInfoDao.updateUser(new UserInfoData(billing));

        } else {  // guest, check for existing billing/shipping from previous guest transaction
            _credentialsId = CredentialsDao.getId(shipping.getEmail());
            if (_credentialsId == -1) {
                // create cred, B and S - credentialsId auto-generated
                CredentialsData _credentialsData = CredentialsDao.addUser(new CredentialsData(-1, shipping.getEmail(), "", true));
                _credentialsId = _credentialsData.getId();
                shipping.setCredentialsId(_credentialsData.getId());
                billing.setCredentialsId(_credentialsData.getId());
                UserInfoDao.createUser(new UserInfoData(shipping));
                UserInfoDao.createUser(new UserInfoData(billing));
            } else {
                shipping.setCredentialsId(_credentialsId);
                billing.setCredentialsId(_credentialsId);
                UserInfoDao.updateUser(new UserInfoData(shipping));
                UserInfoDao.updateUser(new UserInfoData(billing));
            }

        }

        return _credentialsId;  // for transaction table entry
    }


    private boolean isValidUserInfo(List<UserInfoData> userList) {
        UserInfoData shipping = UserInfoDao.getType(UserInfoData.SHIPPING, userList);
        UserInfoData billing = UserInfoDao.getType(UserInfoData.BILLING, userList);

        if (shipping == null || billing == null) {
            return false;
        }
        return true;
    }


}
