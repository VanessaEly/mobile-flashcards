export const lightBlue = '#2f95dc';
export const lightGray = '#ccc';
export const purple = '#292477';
export const white = '#fff';
export const darkGray = '#262626';

const colors = [
  '#a1deff', '#ffbf7b', '#e1a1ff', '#fff1a1', '#9affbc', '#ffa49a', '#ab9aff', '#ffd79a', '#ff80af', '#a8ff80'
]

export const getColor = (index) => colors[index % 10];
