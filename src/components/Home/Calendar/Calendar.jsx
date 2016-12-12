  import React from 'react';
import styles from './Calendar.less';
import * as DateUtil from '../../../utils/dateUtil.js';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseOverPreciousMonth = this.handleMouseOverPreciousMonth.bind(this);
    this.handleMouseOutPreciousMonth = this.handleMouseOutPreciousMonth.bind(this);
    this.handleMouseOverNextMonth = this.handleMouseOverNextMonth.bind(this);
    this.handleMouseOutNextMonth = this.handleMouseOutNextMonth.bind(this);

  }

  render() {
    const date = this.props.date;
    const dateStr = DateUtil.formatDateToStr('yyyy-MM-dd', date);
    const todayStr = DateUtil.formatDateToStr('yyyy-MM-dd', new Date());
    const dateMonthFirstDay = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth(), 1));
    const dateMonthLastDay = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth() + 1, 0));
    const daysArray = this.generateDaysArrayByYearAndMonth(date);

    let classNameDate;

    return(
      <div className={styles.container}>

        <div className={styles.title}>
          <div className={styles.title_date_container}>
            <span onClick={()=>this.props.onCalanderAddMonth(DateUtil.getPreciousMonthDateStr(date))}
                  onMouseOver={this.handleMouseOverPreciousMonth}
                  onMouseOut={this.handleMouseOutPreciousMonth}>
                <img ref='iconCalendarUp' id='icon_calendar_up' src={require('./imgs/icon_calendar_up_normal.png')} />
            </span>
            <span className={styles.title_date}>{dateStr}</span>
            <span onClick={()=>this.props.onCalanderSubtractMonth(DateUtil.getNextMonthDateStr(date))}
                  onMouseOver={this.handleMouseOverNextMonth}
                  onMouseOut={this.handleMouseOutNextMonth}>
                <img ref='iconCalendarDown' id='icon_calendar_down' src={require('./imgs/icon_calendar_down_normal.png')} />
            </span>
          </div>
          <div>
            <div className={styles.title_day}>Mon</div>
            <div className={styles.title_day}>Tue</div>
            <div className={styles.title_day}>Wed</div>
            <div className={styles.title_day}>Thu</div>
            <div className={styles.title_day}>Fri</div>
            <div className={styles.title_day}>Sat</div>
            <div className={styles.title_day}>Sun</div>
          </div>
        </div>
        <div className={styles.content}>
           {
 
              daysArray.map((item, index) => {
                //显示的日期
                let dateOfView = parseInt(item.split('-')[2]);
                let meetingHoldByMe = 0;
                let meetingToAttend = 0;
                let itemDate;

                this.props.data.map(meetingData => {
                  const startDateStr = meetingData.startDate.split(' ')[0];
                  if (startDateStr === item) {
                    if (meetingData.holdByMe) {
                      meetingHoldByMe++;
                    } else {
                      meetingToAttend ++;
                    }
                  }
                });

                if (item < dateMonthFirstDay) {
                  classNameDate = styles.content_day_precious_month;
                  itemDate = new Date(date.getFullYear(), date.getMonth() - 1, dateOfView);
                } else if (item >= dateMonthFirstDay && item < todayStr) {
                  classNameDate = styles.content_day_current_month_before;
                  itemDate = new Date(date.getFullYear(), date.getMonth(), dateOfView);
                } else if (item === todayStr) {
                  classNameDate = styles.content_day_today;
                  itemDate = new Date(date.getFullYear(), date.getMonth(), dateOfView);
                } else if (item > todayStr && item < dateMonthLastDay) {
                  classNameDate = styles.content_day_current_month_after;
                  itemDate = new Date(date.getFullYear(), date.getMonth(), dateOfView);
                } else {
                  classNameDate = styles.content_day_next_month;
                  itemDate = new Date(date.getFullYear(), date.getMonth() + 1, dateOfView);
                }

                const itemDateStr= DateUtil.formatDateToStr('yyyy-MM-dd', itemDate);

                return (
                  <div key={index} className={item === dateStr ? styles.content_day_container_current : styles.content_day_container}
                        onClick={()=>this.handleCalendarChangeDay(itemDateStr)}>
                    <div className={classNameDate}>{dateOfView}</div>
                    <div className={styles.content_day_info}>
                      <MeetingHoldByMe meetingHoldByMe={meetingHoldByMe} />
                      <MeetingToAttend meetingToAttend={meetingToAttend} />
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    );
  }

  //根据某年月获取当月所有显示的日期数组(size)
  generateDaysArrayByYearAndMonth(date) {
    let daysArray = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfPreciousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const allDaysDisplay = 6 * 7;

    //上个月总共的天数
    const daysCountOfCurrentMonth = DateUtil.getDaysSizeOfPerMonth(firstDayOfPreciousMonth.getFullYear(), firstDayOfPreciousMonth.getMonth()); 
    //上个月显示的天数
    let daysShowOfPreciousMonth = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    //本月显示的天数
    let daysShowOfCurrentMonth = DateUtil.getDaysSizeOfPerMonth(year, month);
    //下个月显示的天数
    let daysShowOfNextMonth = allDaysDisplay - daysShowOfPreciousMonth - daysShowOfCurrentMonth;

    for (let i = daysCountOfCurrentMonth - daysShowOfPreciousMonth + 1; i <= daysCountOfCurrentMonth; i++) {
      let date = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(year, month - 1, i));
      daysArray.push(date);
    }

    for (let i = 1; i <= daysShowOfCurrentMonth; i++) {
      let date = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(year, month, i));
      daysArray.push(date);
    }

    for (let i = 1; i <= daysShowOfNextMonth; i++) {
      let date = DateUtil.formatDateToStr('yyyy-MM-dd', new Date(year, month + 1, i));
      daysArray.push(date);
    }

    return daysArray;
  }

  //鼠标悬浮上一个月图标
  handleMouseOverPreciousMonth() {
    this.refs.iconCalendarUp.src = require('./imgs/icon_calendar_up_hover.png');
  }
  //鼠标悬浮上一个月图标
  handleMouseOutPreciousMonth() {
    this.refs.iconCalendarUp.src = require('./imgs/icon_calendar_up_normal.png');
  }
    //鼠标悬浮上一个月图标
  handleMouseOverNextMonth() {
    this.refs.iconCalendarDown.src = require('./imgs/icon_calendar_down_hover.png');
  }
  //鼠标悬浮上一个月图标
  handleMouseOutNextMonth() {
    this.refs.iconCalendarDown.src = require('./imgs/icon_calendar_down_normal.png');
  }

  handleCalendarChangeDay(dateStr) {
    console.log(this)
    this.props.onCalendarChangeDay(dateStr);
  }
}

function MeetingHoldByMe(props) {
  let meetingHoldByMe = props.meetingHoldByMe;
  if (props.meetingHoldByMe > 0) {
    return (
      <div className={styles.meeting_hold_by_me}>
         <img src={require('./imgs/icon_calendar_meeting_me_hold.png')} />&nbsp;
         {meetingHoldByMe}
      </div>
    )
  } else {
    return null;
  }
}

function MeetingToAttend(props) {
    let meetingToAttend = props.meetingToAttend;
    if (props.meetingToAttend > 0) {
      return (
        <div className={styles.meeting_to_attend}>
           <img src={require('./imgs/icon_calendar_meeting_me_attend.png')} />&nbsp;
           {meetingToAttend}
        </div>
      )
      
    } else {
      return null;
    }
}

export default Calendar;
