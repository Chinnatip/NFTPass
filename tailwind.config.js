module.exports = {
  purge: [],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      height: {
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.33%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '2/3': '66.67%',
        '3/4': '75%',
        '4/5': '80%',
      },
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
    },
  },
  variants: {},
  plugins: [],
}
