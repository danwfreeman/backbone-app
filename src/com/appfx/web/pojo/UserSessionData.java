package com.appfx.web.pojo;


import com.appfx.web.util.AppUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.annotation.XmlRootElement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@XmlRootElement
public class UserSessionData {
    private List<CartData> cartDataList;
    private List<UserInfoData> userInfoDataList;
    private CredentialsData credentialsData;
    private List<CatalogData> catalog;
    private List<ZoneData> zones;
    private List<ZoneRateData> zoneRates;

    private static final String SESSION_KEY = "session_key";

    public UserSessionData() {
    }

    public static UserSessionData getSession(HttpServletRequest request) {
        HttpSession session = request.getSession();
        UserSessionData userSessionData = (UserSessionData) session.getAttribute(SESSION_KEY);
        if (userSessionData == null) {
            userSessionData = new UserSessionData();
            try {
                List<CatalogData> catalog = AppUtils.getCatalog();
                List<ZoneData> zones = AppUtils.getZones();
                List<ZoneRateData> zoneRates = AppUtils.getZoneRates();
                userSessionData.setCatalog(catalog);
                userSessionData.setZones(zones);
                userSessionData.setZoneRates(zoneRates);

            } catch (SQLException e) {
                e.printStackTrace();
            }
            session.setAttribute(SESSION_KEY, userSessionData);
        }
        return userSessionData;
    }

    public static void removeSession(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.removeAttribute(SESSION_KEY);
    }

    public void setCatalog(List<CatalogData> catalog) {
        this.catalog = catalog;
    }

    public List<CatalogData> getCatalog() {
        return catalog;
    }

    public List<ZoneData> getZones() {
        return zones;
    }

    public void setZones(List<ZoneData> zones) {
        this.zones = zones;
    }

    public List<ZoneRateData> getZoneRates() {
        return zoneRates;
    }

    public void setZoneRates(List<ZoneRateData> zoneRates) {
        this.zoneRates = zoneRates;
    }

    public List<CartData> getCartDataList() {
        return cartDataList;
    }

    public void setCartDataList(List<CartData> cartDataList) {
        this.cartDataList = cartDataList;
    }

    public List<UserInfoData> getUserInfoDataList() {
        return userInfoDataList;
    }

    public void setUserInfoDataList(List<UserInfoData> userInfoDataList) {
        this.userInfoDataList = userInfoDataList;
    }

    public CredentialsData getCredentialsData() {

        return credentialsData;
    }

    public void setCredentialsData(CredentialsData credentialsData) {
        this.credentialsData = credentialsData;
    }

    public void addCartItem(CartData data) {
        if (cartDataList == null) {
            cartDataList = new ArrayList<CartData>();
        }
        cartDataList.add(data);
    }

    public void addUserInfoItem(UserInfoData data) {
        if (userInfoDataList == null) {
            userInfoDataList = new ArrayList<UserInfoData>(3);
        }
        userInfoDataList.add(data);
    }

    public void updateCartItem(CartData cartData) {
        for (int i = 0; i < cartDataList.size(); i++) {
            if (cartDataList.get(i).getItemNumber().equals(cartData.getItemNumber())) {
                cartDataList.set(i, cartData);
                return;
            }
        }
    }

    public void removeCartItem(String id) {
        Iterator<CartData> iterator = cartDataList.iterator();
        while (iterator.hasNext()) {
            CartData cd = iterator.next(); // must be called before you can call i.remove()
            if (cd.getId().equals(id)) {
                iterator.remove();
            }
        }
    }

    public boolean isAuthed() {
        if (credentialsData == null) {
            return false;
        }
        return true;
    }

    public void removeCartItems() {
        if (cartDataList == null) {
            return;
        }
        cartDataList.clear();
    }

    public void addUserInfoItems(List<UserInfoData> userInfoDataList) {
        if (this.userInfoDataList == null) {
            this.userInfoDataList = new ArrayList<UserInfoData>(3);
        }

        for (UserInfoData u : userInfoDataList) {
            this.userInfoDataList.add(u);
            u.setId(this.userInfoDataList.size());  // set an arbitrary id for now - until record is actually persisted
        }

    }

    public void updateUserInfoItems(List<UserInfoData> userInfoDataList) {
        for (int i = 0; i < userInfoDataList.size(); i++) {
            updateUserInfoItem(userInfoDataList.get(i));
        }
    }

    public void updateUserInfoItem(UserInfoData data) {
        for (int i = 0; i < userInfoDataList.size(); i++) {
            if (userInfoDataList.get(i).getType().equals(data.getType())) {
                data.setId(i);
                userInfoDataList.set(i, data);
                return;
            }
        }
    }

}
