# Pantheon Protocol Examples

This directory contains example scripts demonstrating various use cases for the Pantheon Protocol.

## Available Examples

### 1. Basic Minting (`../scripts/interact.js`)
Demonstrates basic NFT minting, metadata queries, and royalty management.

```bash
PANTHEON_NFT_ADDRESS=0x... npx hardhat run scripts/interact.js --network scrollSepolia
```

### 2. Batch Minting
Mint multiple legacy NFTs in a single transaction for gas efficiency.

### 3. Role Management
Examples of granting and revoking minter roles.

### 4. Royalty Configuration
Setting up custom royalty structures for different tokens.

### 5. Integration Examples
- Metadata preparation (IPFS)
- Frontend integration
- Marketplace integration

## Usage

Each example includes:
- Purpose and use case
- Prerequisites
- Step-by-step instructions
- Expected output
- Common troubleshooting

## Environment Setup

Make sure your `.env` file is configured:

```env
PANTHEON_NFT_ADDRESS=0x...  # Your deployed contract address
PRIVATE_KEY=0x...           # Your wallet private key
SCROLL_SEPOLIA_RPC_URL=...  # RPC endpoint
```

## Running Examples

```bash
# Basic interaction
npx hardhat run scripts/interact.js --network scrollSepolia

# Custom examples
npx hardhat run examples/example-name.js --network scrollSepolia
```

## Creating Your Own Examples

1. Copy an existing example as a template
2. Modify for your use case
3. Test on testnet first
4. Document the purpose and usage

## Support

For questions about examples, please open an issue on GitHub.
