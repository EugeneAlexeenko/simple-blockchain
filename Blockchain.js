const Block = require('./Block');

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

module.exports = Blockchain;
