import moment from 'moment';
import * as Constants from '../constants'

export function formatDate(date) {
	if(date) {
		return moment(date).format(Constants.FORMAT_DATE);
	}
	return '';
}

export function goToTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}