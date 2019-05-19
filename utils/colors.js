export const background = 'rgba(215, 234, 247, 0.5)';
export const lighterBlue = '#58a7dd';
export const lightBlue = '#2f95dc';
export const darkBlue = '#2652ba';
export const lighterGray = '#F7F7F7'
export const lightGray = '#ccc';
export const darkGray = '#545454';
export const purple = '#292477';
export const white = '#fff';
export const darkRed = '#d94c4e';


const colors = [
  '#1b75be', '#408ee0', '#4572AA', '#779ECF', '#89bff8', '#A0CFDF', '#3A92AF', '#056687', '#0051a2', 
];

export const getColor = (index) => colors[index % 10];
