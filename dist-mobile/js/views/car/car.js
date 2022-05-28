define(["jquery","underscore","backbone","text!templates/car/car.html"],function(e,t,n,r){var i=Backbone.View.extend({initialize:function(e){this.template=t.template(r),this.single=app.catalog.getItemById("C1"),this.package=app.catalog.getItemById("B10"),this.showPackage=e},events:{"click .single #single-add":"addSingleToCart","click .package #package-add":"addPackageToCart","click .single .iphone-toggle input[type='checkbox']":"toggleSingleCar","click .package .iphone-toggle input[type='checkbox']":"togglePackageCar","click #pop-up .close":"hideBackOrderWarning"},addSingleToCart:function(e){e.preventDefault(),this.hideBackOrderWarning(),this.addToCart(this.single)},addPackageToCart:function(e){e.preventDefault(),this.hideBackOrderWarning(),this.addToCart(this.package)},toggleSingleCar:function(t){this.hideBackOrderWarning(),e(t.target).attr("checked")==="checked"?this.single=app.catalog.getItemById("C2"):this.single=app.catalog.getItemById("C1"),this.setItemNames()},togglePackageCar:function(t){this.hideBackOrderWarning(),e(t.target).attr("checked")==="checked"?this.package=app.catalog.getItemById("B11"):this.package=app.catalog.getItemById("B10"),this.setItemNames()},addToCart:function(e){window.scrollTo(0,0),app.cartItemList.addItem(e),(e.itemNumber==="C2"||e.itemNumber==="B11")&&this.showBackOrderWarning()},showBackOrderWarning:function(){e("#purchase-car div#pop-up").show()},hideBackOrderWarning:function(t){e("#purchase-car div#pop-up").hide()},render:function(e){return this.$el.html(this.template()),this.el},postRender:function(){this.$(".inner").ajaxStart(app.utils.showGlobalLoader).ajaxStop(app.utils.hideGlobalLoader),e(".photosgallery-vertical").sliderkit({circular:!1,mousewheel:!1,shownavitems:2,verticalnav:!0,navclipcenter:!0,auto:!1}),this.setItemNames(),e(".stock_add.single span.price").text(this.single.price),e(".stock_add.package span.price").text(this.package.price)},setItemNames:function(){e(".stock_add.single span.title").text(this.single.itemName),e(".stock_add.package span.title").text(this.package.itemName)}});return i});