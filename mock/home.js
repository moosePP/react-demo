'use strict';

const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

module.exports = {
  'GET /room/meetings' (req, res) {

    const data = mockjs.mock({
      'data|30': [{
        'id|+1': 1,
        'purpose': '@ctitle(5,60)',
        'holdByMe': '@boolean|1',
        'startDate|1': ['2016-12-09 08:00', '2016-12-16 08:00', '2016-12-0 08:00', '2017-01-06 08:00', '2016-12-02 08:00', '2016-12-06 08:00','2016-11-08 08:00','2016-11-07 08:00'],
        'endDate|1': ['2016-12-08 08:00', '2016-12-16 08:00', '2016-12-0 08:00', '2016-12-06 08:00', '2016-12-02 08:00', '2016-12-06 08:00'],
        'building|1': ['NO.17', 'NO.18', 'NO.21'],
        'roomNo|1': ['17112', '17113', '17119']
      }],
    });

    res.json({
      success: true,
      data: data.data,
    });
  },
};