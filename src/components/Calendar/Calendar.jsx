import React from 'react';
import styles from './Calendar.less';
import * as DateUtil from '../../utils/dateUtil.js';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    // let date = new Date();
    this.state = {
      // dateTitle : DateUtil.formatDateToStr('yyyy-MM-dd', date),
      // dateViewArray : this.generateDaysArrayByYearAndMonth(date)
      date : new Date()
    }
  }

  render() {
    let daysArray = this.generateDaysArrayByYearAndMonth(this.state.date);

    return(
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title_date_container}>
            <span onClick={this.handleClickPreciousMonth.bind(this)} 
                  onMouseOver={this.handleMouseOverPreciousMonth.bind(this)}
                  onMouseOut={this.handleMouseOutPreciousMonth.bind(this)}>
                <img id='icon_calendar_up' src={require('./imgs/icon_calendar_up_normal.png')} />
            </span>
            <span className={styles.title_date}>{DateUtil.formatDateToStr('yyyy-MM-dd', this.state.date)}</span>
            <span onClick={this.handleClickNextMonth.bind(this)} 
                  onMouseOver={this.handleMouseOverNextMonth.bind(this)}
                  onMouseOut={this.handleMouseOutNextMonth.bind(this)}>
                <img id='icon_calendar_down' src={require('./imgs/icon_calendar_down_normal.png')} />
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
                let today = new Date().getDate();
                let classNameContentDay = (item === today ? 'content_day_today' : 'content_day');
                return (
                  <div key={index} className={styles.content_day_container}>
                     <div className={item === today ? styles.content_day_today : styles.content_day}>{item}</div>
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
    const allDaysDisplay = 6 * 7;

    //当年所有月份的天数
    let daysSizeOfPerMonth = DateUtil.getDaysSizeOfPerMonth(year);

    //上个月显示的天数
    let daysCountOfPreciousMonth = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    //本月显示的天数
    let daysCountOfCurrentMonth = daysSizeOfPerMonth[month];
    //下个月显示的天数
    let daysCountOfNextMonth = allDaysDisplay - daysCountOfPreciousMonth - daysCountOfCurrentMonth;

    for (let i = daysSizeOfPerMonth[month - 1] - daysCountOfPreciousMonth + 1; i <= daysSizeOfPerMonth[month - 1]; i++) {
      daysArray.push(i);
    }

    for (let i = 1; i <= daysCountOfCurrentMonth; i++) {
      daysArray.push(i);
    }

    for (let i = 1; i <= daysCountOfNextMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  }

  //点击上一个月图标
  handleClickPreciousMonth() {
    this.setState({
      date: DateUtil.getPreciousMonthDate(this.state.date)
    })
  }
  //点击下一个月图标
  handleClickNextMonth() {
    this.setState({
      date: DateUtil.getNextMonthDate(this.state.date)
    })
  }
  //鼠标悬浮上一个月图标
  handleMouseOverPreciousMonth() {
    document.getElementById('icon_calendar_up').src = require('./imgs/icon_calendar_up_hover.png');
  }
  //鼠标悬浮上一个月图标
  handleMouseOutPreciousMonth() {
    document.getElementById('icon_calendar_up').src = require('./imgs/icon_calendar_up_normal.png');
  }
    //鼠标悬浮上一个月图标
  handleMouseOverNextMonth() {
    document.getElementById('icon_calendar_down').src = require('./imgs/icon_calendar_down_hover.png');
  }
  //鼠标悬浮上一个月图标
  handleMouseOutNextMonth() {
    document.getElementById('icon_calendar_down').src = require('./imgs/icon_calendar_down_normal.png');
  }
}


export default Calendar;
