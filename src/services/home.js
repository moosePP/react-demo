import request from '../utils/request';
import qs from 'qs';

export default async function queryMeetings(params) {
  return request(`booking/home/meetings?${qs.stringify(params)}`);
}