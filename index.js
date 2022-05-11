const crypto = require('crypto');

function sha256(message){
    return crypto.createHash('sha256').update(message).digest('hex');
}

class Block {
    constructor(timestamp = '', data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = '';
        this.nonce = 0;
    }

    getHash() {
        return sha256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty) {
        // Basically, it loops until our hash starts with
        // the string 0...000 with length of <difficulty>.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // We increase our nonce so that we can get a whole different hash.
            this.nonce++;
            // Update our new hash with the new nonce value.
            this.hash = this.getHash();
        }
    }
}

class Blockchain {
    constructor() {
        // create genesis block
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 4;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));
    }

    isValid(blockchain = this) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const previousBlock = blockchain.chain[i - 1];

            if (currentBlock.hash !== currentBlock.getHash()) {
                return false;
            }

            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }

        }
        return true;
    }
}

const myFirstBlockchain = new Blockchain();
myFirstBlockchain.addBlock(new Block(Date.now().toString(), { from: 'Alice', to: 'Bob', amount: 50 }));
myFirstBlockchain.addBlock(new Block(Date.now().toString(), { from: 'Bob', to: 'Alice', amount: 10 }));

console.log(myFirstBlockchain.chain);

console.log('isValid: ', myFirstBlockchain.isValid());

// module.exports = {
//     Block,
//     Blockchain
// };
