import { falconKeypair } from "rust-falcon";
import bip39 from 'bip39';
import { DeterministicSecureRandom } from '../service/deterministicSecureRandom.js';
import crypto from 'crypto';

export const generateKeypair = async (req, res) => {
    try {
        const { seed } = req.body;
        if (!seed) {
            return res.status(400).json({ error: "Seed is required" });
        }

        let mnemonic = bip39.mnemonicToSeedSync(seed, '');
        const randomBytes = new DeterministicSecureRandom(Buffer.from(mnemonic)).nextBytes(48);

        const keypair = falconKeypair(randomBytes);
        const data = {
            publicKey: Buffer.from(keypair.public).toString('hex'),
            secretKey: Buffer.from(keypair.secret).toString('hex'),
        }

        res.status(200).json({
            success: 1,
            message: "Success",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const generateRandomKeypair = async (req, res) => {
    try {
        const { wordCount } = req.body;
        if (!wordCount) {
            return res.status(400).json({ error: "Word count is required" });
        }

        const entropyBytes = {
            12: 16,  // 128 bits
            15: 20,  // 160 bits
            18: 24,  // 192 bits
            21: 28,  // 224 bits
            24: 32   // 256 bits
        }[wordCount];

        if (!entropyBytes) {
            return res.status(400).json({ error: `Invalid word count: ${wordCount}. Must be 12, 15, 18, 21, or 24` });
        }

        const entropy = crypto.randomBytes(entropyBytes);
        const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'));
        const seed = bip39.mnemonicToSeedSync(mnemonic, '');
        const randomBytes = new DeterministicSecureRandom(Buffer.from(seed)).nextBytes(48);

        const keypair = falconKeypair(randomBytes);
        const data = {
            publicKey: Buffer.from(keypair.public).toString('hex'),
            secretKey: Buffer.from(keypair.secret).toString('hex'),
            seedPhrase: mnemonic
        }

        res.status(200).json({
            success: 1,
            message: "Success",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
