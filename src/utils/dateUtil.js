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

//日期字符串转对象
export function parseDate(dateStr) {
  dateStr = dateStr.replace(/-/g,"/");
  return new Date(dateStr);
}

//当年所有月份的天数
export function getDaysSizeOfPerMonth(year, month) {
    let daysSizeOfPerMonth = [];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysSizeOfPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      daysSizeOfPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    return daysSizeOfPerMonth[month];
}

//根据日期获取对应的上月日期
export function getPreciousMonthDate(date) {
  let preciousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  if (preciousMonthDate.getMonth() === date.getMonth()) {
    const preciousMonthFirstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    preciousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, getDaysSizeOfPerMonth(preciousMonthFirstDate.getFullYear(), preciousMonthFirstDate.getMonth()));
  }

  return preciousMonthDate;
}

export function getPreciousMonthDateStr(date) {
  return formatDateToStr(null, getPreciousMonthDate(date));
}

//根据日期获取对应的下月日期
export function getNextMonthDate(date) {
  let nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (nextMonthDate.getMonth() === (date.getMonth() + 2)) {
   const nextMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    preciousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, getDaysSizeOfPerMonth(nextMonthFirstDate.getFullYear(), nextMonthFirstDate.getMonth()));
  }

  return nextMonthDate;
}

export function getNextMonthDateStr(date) {
  return formatDateToStr(null, getNextMonthDate(date));
}

//获取当月第一天
export function getMonthBeginDateStr(date) {
  if ('string' === typeof(date)) {
    date = parseDate(date);
  }
  return formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth(), 1));
}

//获取当月第一天
export function getMonthEndDateStr(date) {
  if ('string' === typeof(date)) {
    date = parseDate(date);
  }
  return formatDateToStr('yyyy-MM-dd', new Date(date.getFullYear(), date.getMonth() + 1, 0));
}