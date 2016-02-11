const numUtils = {
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (min - max)) + max
  },

  getRandomFloat(min, max) {
    return parseFloat((Math.random() * (min - max) + max).toFixed(2))
  },
}

export default numUtils;
