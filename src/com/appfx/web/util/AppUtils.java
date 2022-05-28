package com.appfx.web.util;

import com.appfx.web.dao.CatalogDao;
import com.appfx.web.dao.UserInfoDao;
import com.appfx.web.dao.ZoneDao;
import com.appfx.web.pojo.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AppUtils {

    private final static List<Eligible> eligibility = setEligibleItems();
    private static List<CatalogData> catalogDataList = null;
    private static List<ZoneData> zoneDataList = null;
    private static List<ZoneRateData> zoneRateDataList = null;

    // sticker codes
    public static final String APPFX_STICKERS = "S10";
    public static final String DCLABS_STICKERS = "S11";
    public static final String POLICE_STICKERS = "S12";
    public static final String PATROL_STICKERS = "S13";
    public static final String CAR = "C1";
    public static final String CAR5 = "C2";
    public static final String PACKAGE = "B10";
    public static final String PACKAGE5 = "B11";
    public static final String BUNDLE_STICKERS = "B13";


    // car codes

    // complete package codes

    public static boolean isEligibleCouponItem(int catalogId) {
        return false;
    }

    public static String getOrderTotal() {
        return "";
    }


    public static void applyEligibleDiscount(CartData d, List<CouponData> couponDataList) {
        for (Eligible e : eligibility) {
            if (e.itemNumber.equals(d.getItemNumber())) {
                // it's eligible see if it matches an item in this particular couponDataList (may be a list of size 1)
                for (CouponData c : couponDataList) {
                    if (c.getItemNumber().equals(d.getItemNumber())) {
                        d.setPrice(c.getPrice());  // apply discount
                        d.setDiscounted(true);
                    }
                }
            }
        }
    }


    private static List setEligibleItems() {
        List list = new ArrayList();

        // fx-car item
        Eligible e = new Eligible();
        e.itemNumber = CAR;
        e.discountPrice = "12.00";
        list.add(e);

        // fx-car iphone5
        e = new Eligible();
        e.itemNumber = CAR5;
        e.discountPrice = "12.00";
        list.add(e);

        // sticker bundle
        e = new Eligible();
        e.itemNumber = BUNDLE_STICKERS;
        e.discountPrice = "8.00";
        list.add(e);

        return list;
    }

    // singleton around catalog list
    public synchronized static List<CatalogData> getCatalog() throws SQLException {
        if (catalogDataList == null) {
            catalogDataList = CatalogDao.getCatalogList();
        }
        return catalogDataList;
    }

    // singleton around zone list
    public synchronized static List<ZoneData> getZones() throws SQLException {
        if (zoneDataList == null) {
            zoneDataList = ZoneDao.getZoneList();
        }
        return zoneDataList;
    }

    // singleton around zone rate list
    public synchronized static List<ZoneRateData> getZoneRates() throws SQLException {
        if (zoneRateDataList == null) {
            zoneRateDataList = ZoneDao.getZoneRateList();
        }
        return zoneRateDataList;
    }


    public static String getPriceForID(String id) {
        for (CatalogData c : catalogDataList) {
            if (c.getItemNumber().equals(id)) {
                return c.getPrice();
            }
        }
        return null;
    }

    public static boolean hasCompletePackageItem(List<CartData> cartList) {
        for (CartData d : cartList) {
            String id = d.getItemNumber();
            if (PACKAGE.equals(id) || PACKAGE5.equals(id)) {
                return true;
            }
        }
        return false;
    }


    static class Eligible {
        String itemNumber;
        String discountPrice;
        final static String STICKER_BUNDLE_CODE = "fx family";

        public boolean isStickerBundle() {
            if (BUNDLE_STICKERS.equals(itemNumber)) {
                return true;
            }
            return false;
        }
    }

    public static String getShippingForOrder(OrderData orderData) {
        UserInfoData shipping = UserInfoDao.getType(UserInfoData.SHIPPING, orderData.getUserInfoDataList());
        String zip = shipping.getPostal();

        if (containsStickersOnly(orderData.getCartDataList()) || hasCompletePackageItem(orderData.getCartDataList())) {
            return "0.00";
        }

        return getPriceForZip(zip, isMultipleCars(orderData.getCartDataList()));
    }


    private static boolean containsStickersOnly(List<CartData> cartDataList) {
        List<String> stickerCodes = new ArrayList<String>(4);
        stickerCodes.add(APPFX_STICKERS);
        stickerCodes.add(DCLABS_STICKERS);
        stickerCodes.add(POLICE_STICKERS);
        stickerCodes.add(PATROL_STICKERS);
        stickerCodes.add(BUNDLE_STICKERS);

        for (CartData c : cartDataList) {
            if (!stickerCodes.contains(c.getItemNumber())) {
                return false;
            }
        }

        return true;
    }

    private static boolean isMultipleCars(List<CartData> cartDataList) {
        int count = 0;
        List<String> carCodes = new ArrayList<String>(4);
        carCodes.add(PACKAGE);
        carCodes.add(PACKAGE5);
        carCodes.add(CAR);
        carCodes.add(CAR5);

        for (CartData c : cartDataList) {
            if (carCodes.contains(c.getItemNumber())) {
                count = count + c.getQuantity();
                count++;
            }
        }

        if (count > 1) {
            return true;
        }
        return false;

    }


    private static int getZoneForZip(String zip) {
        // we are only interest in the first 3 digits
        zip = zip.substring(0, 3);
        int zipAsInt = Integer.parseInt(zip);
        for (int i = 0; i < zoneDataList.size(); i++) {
            if (zipAsInt >= zoneDataList.get(i).getLowZip() && zipAsInt <= zoneDataList.get(i).getHighZip()) {
                return zoneDataList.get(i).getZone();
            }
        }

        return -1;
    }

    private static String getPriceByZone(int zone, boolean isMultipleCars) {
        for (int i = 0; i < zoneRateDataList.size(); i++) {
            if (zoneRateDataList.get(i).getZone() == zone) {
                return isMultipleCars == true ? zoneRateDataList.get(i).getCostMultipleCars() : zoneRateDataList.get(i).getCostSingleCar();
            }
        }
        return null;
    }

    private static String getPriceForZip(String zip, boolean isMultipleCars) {
        int zone = getZoneForZip(zip);
        if (zone == -1) {
            return null;
        }
        return getPriceByZone(zone, isMultipleCars);
    }


}
