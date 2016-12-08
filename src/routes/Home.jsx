import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as DateUtil from '../utils/dateUtil.js';
import styles from './Home.less';

// 引入 connect 工具函数
import { connect } from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import Calendar from '../components/Home/Calendar/Calendar';
import TodayMeetings from '../components/Home/TodayMeetings/TodayMeetings';

export default function Home() {

  const data = [
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-06 08:00', endDate: '2016-12-06 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'woh啊哈哈', holdByMe: false, startDate: '2016-12-06 10:00', endDate: '2016-12-06 11:30', building:'NO.17', roomNo:'17118'},
      { purpose: '咿呀iayfd', holdByMe: false, startDate: '2016-12-06 11:00', endDate: '2016-12-06 15:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-07 08:00', endDate: '2016-12-07 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'w啊哈哈', holdByMe: true, startDate: '2016-12-07 08:00', endDate: '2016-12-07 10:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: '哈哈哈', holdByMe: false, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'},
      { purpose: 'fadfa', holdByMe: true, startDate: '2016-12-08 08:00', endDate: '2016-12-08 08:30', building:'NO.17', roomNo:'17118'}
  ];

  let todayData = [];
  const currentDateStr = DateUtil.formatDateToStr('yyyy-MM-dd', new Date());
  data.map((item, index) => {
    if (currentDateStr === item.startDate.split(' ')[0]) {
     todayData.push(item);
    }
  })

  return (
    <div>
      <div className={styles.Calendar}>
        <Calendar data={data}/>
      </div>
      <div className={styles.TodayMeetings}>
        <TodayMeetings data={todayData} />
      </div>
    </div>
  )
}
