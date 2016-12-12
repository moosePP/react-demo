import queryMeetings from '../services/home.js';
import { parse } from 'qs';
import * as DateUtil from '../utils/dateUtil.js';

export default {
  namespace: 'home',
  state: {
    data: [],
    date: new Date(),
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/home') {
          dispatch({
            type: 'calendarChangeMonth',
            payload: {
              date: DateUtil.formatDateToStr('yyyy-MM-dd', new Date()),
            }
          });
        }
      });
    },
  },

  effects: {
    calendarChangeMonth({ payload }, {select, call, put }){
      const date = parse(payload).date;
      const beginDate = DateUtil.getMonthBeginDateStr(date);
      const endDate = DateUtil.getMonthEndDateStr(date);
      const { data }  = yield call(queryMeetings, {beginDate, endDate});
      if (data) {
        yield put({
          type: 'calendarChangeMonthSuccess',
          payload: {
            data: data.data,
            date: DateUtil.parseDate(payload.date),
          },
        });
      }
    },
  },

  reducers: {
    calendarChangeMonthSuccess(state, action){
      return {...state, ...action.payload};
    },

    calendarChangeDay(state, action){
      const payload = {
        date: DateUtil.parseDate(action.payload.date)
      }
      return {...state, ...payload};
    }
  },
}
