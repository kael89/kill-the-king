const BLACK = 'black';
const WHITE = 'white';

export default {
  BLACK,
  WHITE,
  opposite: color => (color === BLACK ? WHITE : BLACK),
};
