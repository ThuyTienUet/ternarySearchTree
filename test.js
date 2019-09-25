const TernarySearchTree = require('./index.js');

const tst = new TernarySearchTree();

tst.add('is');
tst.add('in');
// tst.add('it');
// tst.add('be');
// tst.add('by');
// tst.add('he');
// tst.add('as');
// tst.add('at');
// tst.add('on');
// tst.add('of');
// tst.add('or'); 
// tst.add('to');

console.warn(tst.root.mid);
