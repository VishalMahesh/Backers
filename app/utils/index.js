import { DayTime } from '../constants/dummy'
import Moment from 'moment'

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

class AppUtils {
  isUndefined(x) {
    return typeof x === "undefined";
  }

  isNull(x) {
    return x === null;
  }

  isEmpty(x) {
    return x == ""
  }

  exists(x) {
    return !this.isUndefined(x) && !this.isNull(x) && !this.isEmpty(x);
  }

  timeSlotToTimestamp(time, newTime) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    let dateObj = newTime ? newTime : new Date()
    let newDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), sHours, sMinutes)
    return newDate
  }

  timeIndex(time) {
    let date = formatAMPM(new Date(time))
    let arr = [...DayTime]
    var objInd = arr.findIndex((e) => e.name == date);
    return objInd
  }


  timeDiff(item) {
    var momentDateObj = Moment(new Date(item));
    var strString = momentDateObj.toNow(true).toString();
    return strString + " " + "ago";
  };

  prettierDate(date) {
    let newTime = new Date(date).toDateString()
    return newTime
  }

  prettierTime(t) {
    var time = new Date(t);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

}

export default new AppUtils();