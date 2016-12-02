//格式化日期

export function formatDateToStr(format, date) {
  var format = arguments[0] || "yyyy-MM-dd hh:mm:ss";
  var date = arguments[1] || new Date();

  var weekNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  /*
   * format="yyyy-MM-dd hh:mm:ss";
   */
  var o = {
    "M+" : date.getMonth() + 1,
    "d+" : date.getDate(),
    "h+" : date.getHours(),
    "m+" : date.getMinutes(),
    "s+" : date.getSeconds(),
    "q+" : Math.floor((date.getMonth() + 3) / 3),
    "S" : date.getMilliseconds(),
    "w" : weekNames[date.getDay()]
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "")
              .substr(4 - RegExp.$1.length));
  }

  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

//当年所有月份的天数
export function getDaysSizeOfPerMonth(year) {
    let daysSizeOfPerMonth = [];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysSizeOfPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      daysSizeOfPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    return daysSizeOfPerMonth;
}

//根据日期获取对应的上月日期
export function getPreciousMonthDate(date) {
  let preciousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  if (preciousMonthDate.getMonth() === date.getMonth()) {
    let daysSizeOfPerMonth;
    if (date.getMonth() === 0) {
      daysSizeOfPerMonth = getDaysSizeOfPerMonth(date.getFullYear() - 1);
    } else {
      daysSizeOfPerMonth = getDaysSizeOfPerMonth(date.getFullYear());
    }
    preciousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, daysSizeOfPerMonth[date.getMonth() - 1]);
  }

  return preciousMonthDate;
}

//根据日期获取对应的下月日期
export function getNextMonthDate(date) {
  let nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (nextMonthDate.getMonth() === (date.getMonth() + 2)) {
    let daysSizeOfPerMonth;
    if (date.getMonth() === 11) {
      daysSizeOfPerMonth = getDaysSizeOfPerMonth(date.getFullYear() + 1);
    } else {
      daysSizeOfPerMonth = getDaysSizeOfPerMonth(date.getFullYear());
    }
    nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, daysSizeOfPerMonth[date.getMonth() + 1]);
  }

  return nextMonthDate;
}