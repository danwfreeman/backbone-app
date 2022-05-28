package com.appfx.paypal;

import com.appfx.web.dao.EmailDao;
import com.appfx.web.pojo.CartData;
import com.appfx.web.pojo.OrderData;
import com.appfx.web.pojo.UserInfoData;

import java.util.ArrayList;
import java.util.List;

public class SendMailTest {

    public static void main(String[] args) {
        OrderData orderData = new OrderData();

        List<CartData> cartDataList = new ArrayList<CartData>();
        List<UserInfoData> userInfoDataList = new ArrayList<UserInfoData>();

        orderData.setHandling("5.25");
        orderData.setGrandTotal("45.25");

        CartData cartData = new CartData();
        cartData.setTotal("25.00");
        cartData.setQuantity(2);
        cartData.setItemName("FX Car");
        cartDataList.add(cartData);
        cartData = new CartData();
        cartData.setTotal("15.00");
        cartData.setQuantity(1);
        cartData.setItemName("FX Package");
        cartDataList.add(cartData);

        orderData.setCartDataList(cartDataList);

        UserInfoData userInfoData = new UserInfoData();
        userInfoData.setEmail("dude@dude.com");
        userInfoData.setFirstName("dude");
        userInfoData.setLastName("dudedude");
        userInfoData.setAddress1("add1");
        userInfoData.setAddress2("add2");
        userInfoData.setCity("portland");
        userInfoData.setRegion("Oregon");
        userInfoData.setCountry("US of A");
        userInfoData.setPostal("98673");
        userInfoData.setType(UserInfoData.SHIPPING);
        userInfoDataList.add(userInfoData);

        userInfoData = new UserInfoData();
        userInfoData.setEmail("dude@dude.com");
        userInfoData.setFirstName("dude");
        userInfoData.setLastName("dudedude");
        userInfoData.setAddress1("add1");
        userInfoData.setAddress2("add2");
        userInfoData.setCity("portland");
        userInfoData.setRegion("Oregon");
        userInfoData.setCountry("US of A");
        userInfoData.setPostal("98673");
        userInfoData.setType(UserInfoData.BILLING);
        userInfoDataList.add(userInfoData);

        orderData.setUserInfoDataList(userInfoDataList);

        EmailDao.sendReceiptEmail(orderData);
    }



}