import Vue from "vue";

//Usuarios
import cmpUserDetails from "@/components/modules/user/user_list/user_details_list"
import cmpUserSellerProfile from "@/components/modules/user/sellerprofile";

Vue.component("app-usersdetails", cmpUserDetails);
Vue.component("app-seller-profile", cmpUserSellerProfile);