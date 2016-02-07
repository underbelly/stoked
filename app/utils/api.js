let api = {
  postStokedCount(number) {
    let url = `https://stoked.firebaseio.com/count.json`
		return fetch(url, {
      method: 'put',
      body: JSON.stringify(number)
    }).then((res) => res.json())
  },

  getStokedCount() {
    let url = `https://stoked.firebaseio.com/count.json`
    return fetch(url).then((res) => res.json())
  },
};

export default api;
