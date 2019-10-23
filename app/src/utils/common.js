export function formatDate(date) {
	if(date) {
		const year = date.substr(0, 4);
		const month = date.substr(5, 2);
		const day = date.substr(8, 2);
		return year + '-' + month + '-' + day;
	}
	return '';
}

export function goToTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}