const Block = require('./Block');
const Blockchain = require('./Blockchain');

const myFirstBlockchain = new Blockchain();
myFirstBlockchain.addBlock(new Block(Date.now().toString(), { from: 'Alice', to: 'Bob', amount: 50 }));
myFirstBlockchain.addBlock(new Block(Date.now().toString(), { from: 'Bob', to: 'Alice', amount: 10 }));

console.log(myFirstBlockchain.chain);
console.log('isValid: ', myFirstBlockchain.isValid());
