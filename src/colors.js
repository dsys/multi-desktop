import Color from 'color';

const colors = {
  white1: 'white',
  white2: '#FAFAFA',
  gray1: '#333',
  gray2: '#666',
  gray3: '#EEE',
  black1: 'black',
  blue1: '#4E6674',
  blue2: '#4C9DEF',
  blue3: '#2564DA',
  green1: '#1DA81D',
  yellow1: '#F5C223',
  red1: '#D0021B'
};

colors.blue2dark = Color(colors.blue2).darken(0.7).rgb().string()

export default colors;
