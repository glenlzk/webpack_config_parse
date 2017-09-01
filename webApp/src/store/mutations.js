import {
    SAVE_HOTEL_QUERY,
    INIT_HOTEL_QUERY,
    SAVE_ROOMTYPE_DETAIL,
    INIT_ROOMTYPE_DETAIL,
    SAVE_HOTEL_LIST,
    INIT_HOTEL_LIST,
    CLEAR_HOTEL_LIST,
    GET_OPTIONAL_CITY
} from './mutation-types.js'

import {
	setStore,
	getStore,getDate,getNextDate
} from '../config/mUtils'

export default {
    //获取用户信息存入vuex
    [GET_OPTIONAL_CITY](state, info) {
      if (state.optionalCity ) {
        return;
      };
    },
    [SAVE_HOTEL_QUERY](state, {
        checkinDate,
        checkoutDate,
        cityId
    }) {
        let query = state.hotelQuery;
        query['checkinDate'] = checkinDate;
        query['checkoutDate'] = checkoutDate;
        if(cityId){
          query['cityId'] = cityId;
        }
        state.hotelQuery = {...query};
        //存入localStorage
        setStore('KKWEBAPP_hotelQuery', state.hotelQuery);
    },
    [INIT_HOTEL_QUERY](state) {
        var nowDateStr = getDate();
        let initHotelQuey = getStore('KKWEBAPP_hotelQuery');
        if (initHotelQuey) {
            var hotelQuery = JSON.parse(initHotelQuey);

            if(hotelQuery.checkinDate < nowDateStr){
              hotelQuery.checkinDate = nowDateStr;
            }
            if(hotelQuery.checkoutDate < getNextDate(new Date())){
              hotelQuery.checkoutDate = getNextDate(new Date());
            }
            state.hotelQuery = {...hotelQuery};
            //存入localStorage
            setStore('KKWEBAPP_hotelQuery', hotelQuery);
        }else{
            var query = {
              checkinDate:nowDateStr,
              checkoutDate:getNextDate(nowDateStr),
            };
            state.hotelQuery = {...query};
            //存入localStorage
            setStore('KKWEBAPP_hotelQuery', state.hotelQuery);
        }
    },
    //保存房型详情信息
    [SAVE_ROOMTYPE_DETAIL](state, {
      hotelId,
      roomTypeId,
      roomTypeName,
      bedType,
      floor,
      houseType,
      imgUrlList,
      roomArea,
      wifiSupport
    }) {
      let roomTypeDetail = state.roomTypeDetail;
      roomTypeDetail['hotelId'] = hotelId;
      roomTypeDetail['roomTypeId'] = roomTypeId;
      roomTypeDetail['roomTypeName'] = roomTypeName;
      roomTypeDetail['bedType'] = bedType;
      roomTypeDetail['floor'] = floor;
      roomTypeDetail['houseType'] = houseType;
      roomTypeDetail['roomArea'] = roomArea;
      roomTypeDetail['wifiSupport'] = wifiSupport;
      roomTypeDetail['imgUrlList'] = imgUrlList;
      state.roomTypeDetail = {...roomTypeDetail};
      //存入localStorage
      setStore('KKWEBAPP_roomTypeDetail', state.roomTypeDetail);
    },
    [INIT_ROOMTYPE_DETAIL](state) {
      let initRoomTypeDetail = getStore('KKWEBAPP_roomTypeDetail');
      if (initRoomTypeDetail) {
        state.roomTypeDetail = JSON.parse(initRoomTypeDetail);
      }
    },
    [SAVE_HOTEL_LIST](state, {
      itemList
    }) {
      state.hotelList = state.hotelList.concat(itemList);
      state.hotelList = [...state.hotelList];;
      //存入localStorage
      setStore('KKWEBAPP_hotelList', state.hotelList);
    },
    [INIT_HOTEL_LIST](state) {
      let list = getStore('KKWEBAPP_hotelList');
      if (list) {
        var hotelList = JSON.parse(list);
        state.hotelList = [...hotelList];
      }
    },
    [CLEAR_HOTEL_LIST](state) {
      state.hotelList = [];
      state.hotelList = [...state.hotelList];
      setStore('KKWEBAPP_hotelList', state.hotelList);
    }
}
