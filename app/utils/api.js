import moment from 'moment';

const date = moment().format('MM-DD-YYYY');

const api = {
  postStokedCount(username, number) {
    let url = `https://stoked.firebaseio.com/${username}/${date}/count.json`
		return fetch(url, {
      method: 'put',
      body: JSON.stringify(number)
    }).then((res) => res.json())
  },

  getStokedCount(username) {
    let url = `https://stoked.firebaseio.com/${username}/${date}/count.json`
    return fetch(url).then(res => res.json());
  },
};

export default api;
