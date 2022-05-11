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

module.exports = Block;
