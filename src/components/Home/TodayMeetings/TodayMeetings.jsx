
import React from 'react';
import styles from './TodayMeetings.less';
import * as DateUtil from '../../../utils/dateUtil.js';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

class TodayMeetings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hasRecord = (this.props.data.length !== 0);

    if (hasRecord) {
      return (
        <div>
        {
          this.props.data.map((item,index) => {
            return (
              <TodayMeetingItem data={item} key={index}/>
            )
          })
        }
        </div>
      ) 
    }else {
      return (
        <div className={styles.no_record}>
          暂时没有会议哦～
        </div>
      )
    }
  }
}

class TodayMeetingItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      item_container_hover: false
    };

    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnMouseOverImgEdit = this.handleOnMouseOverImgEdit.bind(this);
    this.handleOnMouseOutImgEdit = this.handleOnMouseOutImgEdit.bind(this);
    this.handleOnClickImgEdit = this.handleOnClickImgEdit.bind(this);
  }

  render() {
    const time = this.props.data.startDate.split(' ')[1] + '~' + this.props.data.endDate.split(' ')[1];
    const site = this.props.data.building + '-' + this.props.data.roomNo;
    let classNameContainer = cx({
      item_container: true,
      item_container_hover: this.state.item_container_hover
    });

    return (
      <div className={classNameContainer} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
        <div className={styles.item_detail}>
            <img className={styles.item_detail_img_info} src={this.props.data.holdByMe ? require('./imgs/icon_me_hold.png') : require('./imgs/icon_me_attend.png')} />
            <span className={styles.item_detail_time}>Time: {time}</span>
            <span>Site: {site}</span>
            <img ref='imgEdit' className={styles.item_detail_img_edit} src={require('./imgs/icon_edit_normal.png')} onMouseOver={this.handleOnMouseOverImgEdit} onMouseOut={this.handleOnMouseOutImgEdit} onClick={this.handleOnClickImgEdit}/>
        </div>
        <div className={styles.item_split}></div>
        <div className={styles.item_purpose}>
          {this.props.data.purpose || 'N/A'}
        </div>
      </div>
    )
  }

  handleOnMouseOver () {
    this.setState({
      item_container_hover: true
    });
  }

  handleOnMouseOut () {
    this.setState({
      item_container_hover: false
    });
  }

  handleOnMouseOverImgEdit () {
    this.refs.imgEdit.src = require('./imgs/icon_edit_hover.png');
  }

  handleOnMouseOutImgEdit () {
    this.refs.imgEdit.src = require('./imgs/icon_edit_normal.png');
  }

  handleOnClickImgEdit () {
    this.refs.imgEdit.src = require('./imgs/icon_edit_click.png');
  }
}


export default TodayMeetings;