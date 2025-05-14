import crypto from 'crypto';

export class DeterministicSecureRandom {
    constructor(seed, digest = 'sha256') {
        this.seed = typeof seed === 'string' ? Buffer.from(seed, 'hex') : Buffer.from(seed);
        this.counter = 0;
        this.digest = digest;
    }

    nextBytes(length) {
        const result = Buffer.alloc(length);
        let offset = 0;

        while (offset < length) {
            const hash = crypto.createHash(this.digest);
            hash.update(this.seed);
            const counterBuffer = Buffer.alloc(4);
            counterBuffer.writeUInt32BE(this.counter++, 0);
            hash.update(counterBuffer);
            const hashed = hash.digest();

            const toCopy = Math.min(hashed.length, length - offset);
            hashed.copy(result, offset, 0, toCopy);
            offset += toCopy;
        }

        return result;
    }
}
