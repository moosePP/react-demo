  import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// 引入 connect 工具函数
import { connect } from 'dva';

import Calendar from '../components/Home/Calendar/Calendar';
import TodayMeetings from '../components/Home/TodayMeetings/TodayMeetings';
import * as DateUtil from '../utils/dateUtil.js';

import styles from './Home.less';

export function Home({ location, dispatch, home }) {
  const {date, data} = home;
  const dateStr =  DateUtil.formatDateToStr('yyyy-MM-dd', date);

  const calendarProps = {
    data: data,
    date: date,
    onCalanderAddMonth(dateStr) {
      dispatch({
        type: `home/calendarChangeMonth`,
        payload: {
          date: dateStr
        }
      });
    },
    onCalanderSubtractMonth(dateStr) {
      dispatch({
        type: `home/calendarChangeMonth`,
        payload: {
          date: dateStr
        }
      });
    },
    onCalendarChangeDay(dateStr) {
      const dateMonthFirstDay = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth(), 1));
      const dateMonthLastDay = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth() + 1, 0));
      if (dateStr >= dateMonthFirstDay && dateStr <= dateMonthLastDay) {
      console.log(233)
        dispatch({
          type: `home/calendarChangeDay`,
          payload: {
            date: dateStr
          }
        });
      } else {
        dispatch({
          type: `home/calendarChangeMonth`,
          payload: {
            date: dateStr
          }
        });
      }
    }
  };

  let currentDayMeetingData = [];
  data.map(item => {
    if (dateStr === item.startDate.split(' ')[0]) {
      currentDayMeetingData.push(item);
    }
  })
  
  return (
    <div>
      <div className={styles.Calendar}>
        <Calendar {...calendarProps}/>
      </div>
      <div className={styles.TodayMeetings}>
        <TodayMeetings data={currentDayMeetingData} />
      </div>
    </div>
  )
}


// 指定订阅数据，这里关联了 home
function mapStateToProps({ home }) {
  return {home};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Home);
