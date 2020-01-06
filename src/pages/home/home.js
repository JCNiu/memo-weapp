import { slutil, Page, suiLocalConfig } from '../../common/index';
import myService from './home.service';

Page({
  data: {

  },

  onSlShow() {
  
  },

  // 路由跳转
  goToRoute(event) {
    let { route } = event.currentTarget.dataset;
    let routeUrl = myService.route[route];
    slutil.navigateTo(routeUrl);
  },

  dateOnChange(event) {
    console.log(event.detail.value);
  },

  rollViewClick(event) {
    console.log(event.detail.value);
  }
})