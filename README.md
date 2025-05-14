# Falcon Server

A Node.js server for generating Falcon cryptographic keypairs using rust-falcon and BIP39 mnemonics.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/keep-pwr-strong/falcon-server
cd falcon-server
```

2. Install dependencies:
```bash
yarn install
```

3. Start the server:
```bash
yarn start
```

The server will start running on `http://localhost:3000`

## API Endpoints

### 1. Generate Keypair with Custom Seed
Generate a Falcon keypair using a hex-encoded seed. The seed should be converted to hex format before sending.

```bash
curl "http://localhost:3000/generateKeypair?seed=64656d616e6420617072696c206c656e67746820736f6170206361736820636f6e636572742073687566666c6520726573756c7420666f726365206d656e74696f6e206672696e676520736c696d"
```

Response:
```json
{
  "success": 1,
  "message": "Success",
  "data": {
    "publicKey": "hex_encoded_public_key",
    "secretKey": "hex_encoded_secret_key"
  }
}
```

### 2. Generate Random Keypair
Generate a random Falcon keypair with a new BIP39 mnemonic. You can specify the word count (12, 15, 18, 21, or 24) as a query parameter. If not specified, it defaults to 12 words.

```bash
curl "http://localhost:3000/generateRandomKeypair?wordCount=12"
```

Response:
```json
{
  "success": 1,
  "message": "Success",
  "data": {
    "publicKey": "hex_encoded_public_key",
    "secretKey": "hex_encoded_secret_key",
    "seedPhrase": "random generated mnemonic phrase"
  }
}
```

#### Word Count Options

- 12 words (128 bits) - Default
- 15 words (160 bits)
- 18 words (192 bits)
- 21 words (224 bits)
- 24 words (256 bits)

## Response Format

- All keys (public and secret) are returned in hexadecimal format
- The random keypair endpoint includes the seed phrase used to generate the keys
- Success responses include a status code of 1 and a success message
- Error responses include appropriate HTTP status codes and error messages
