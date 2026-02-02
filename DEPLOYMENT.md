# Deployment Guide

This guide walks through deploying the Pantheon Protocol smart contracts to Scroll networks.

## Prerequisites

1. **Node.js**: Version 18+ (22.10.0+ recommended for Hardhat compatibility)
2. **Wallet**: Private key with ETH on target network
3. **RPC Access**: Scroll network RPC endpoints
4. **Scrollscan API Key**: For contract verification (optional)

## Network Information

### Scroll Sepolia Testnet
- **Chain ID**: 534351
- **RPC URL**: https://sepolia-rpc.scroll.io/
- **Explorer**: https://sepolia.scrollscan.com/
- **Faucet**: https://sepolia.scroll.io/faucet

### Scroll Mainnet
- **Chain ID**: 534352
- **RPC URL**: https://rpc.scroll.io/
- **Explorer**: https://scrollscan.com/

## Setup

### 1. Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Scroll Sepolia testnet RPC
SCROLL_SEPOLIA_RPC_URL=https://sepolia-rpc.scroll.io/

# Scroll mainnet RPC
SCROLL_RPC_URL=https://rpc.scroll.io/

# Your deployer wallet private key (DO NOT COMMIT!)
PRIVATE_KEY=0x...

# Scrollscan API key for verification
SCROLLSCAN_API_KEY=...

# Enable gas reporting (optional)
REPORT_GAS=false
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile Contracts

```bash
npm run compile
```

## Deployment

### Deploy to Scroll Sepolia (Testnet)

1. **Get testnet ETH** from the [Scroll Sepolia faucet](https://sepolia.scroll.io/faucet)

2. **Deploy the contract**:
   ```bash
   npm run deploy:scroll-sepolia
   ```

3. **Note the deployed address** from the output

### Deploy to Scroll Mainnet

⚠️ **IMPORTANT**: Ensure you have sufficient ETH for deployment and gas fees.

```bash
npm run deploy:scroll
```

## Post-Deployment

### 1. Verify Contract on Scrollscan

After deployment, verify your contract on Scrollscan:

```bash
npx hardhat verify --network scrollSepolia <CONTRACT_ADDRESS> <ADMIN_ADDRESS> <ROYALTY_RECEIVER_ADDRESS>
```

For mainnet:
```bash
npx hardhat verify --network scroll <CONTRACT_ADDRESS> <ADMIN_ADDRESS> <ROYALTY_RECEIVER_ADDRESS>
```

### 2. Grant Minter Roles

Grant the `MINTER_ROLE` to authorized addresses:

```javascript
const pantheonNFT = await ethers.getContractAt("PantheonNFT", contractAddress);

// Grant minter role
const MINTER_ROLE = await pantheonNFT.MINTER_ROLE();
await pantheonNFT.grantRole(MINTER_ROLE, minterAddress);
```

### 3. Configure Royalties

If needed, update default royalty settings:

```javascript
// Set default royalty to 7.5%
await pantheonNFT.setDefaultRoyalty(
  royaltyReceiverAddress,
  750  // 7.5% in basis points
);
```

## Custom Deployment Script

For more control, create a custom deployment script:

```javascript
// scripts/custom-deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  // Custom admin and royalty addresses
  const adminAddress = "0x...";
  const royaltyAddress = "0x...";
  
  const PantheonNFT = await hre.ethers.getContractFactory("PantheonNFT");
  const pantheonNFT = await PantheonNFT.deploy(adminAddress, royaltyAddress);
  await pantheonNFT.waitForDeployment();
  
  console.log("PantheonNFT deployed to:", await pantheonNFT.getAddress());
  
  // Grant additional minters
  const MINTER_ROLE = await pantheonNFT.MINTER_ROLE();
  await pantheonNFT.grantRole(MINTER_ROLE, "0x...");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run it with:
```bash
npx hardhat run scripts/custom-deploy.js --network scrollSepolia
```

## Troubleshooting

### Issue: "insufficient funds for intrinsic transaction cost"
- **Solution**: Ensure your wallet has enough ETH for gas fees

### Issue: "nonce too low"
- **Solution**: Reset your wallet's transaction history or wait for pending transactions

### Issue: "NETWORK_ERROR: getaddrinfo ENOTFOUND"
- **Solution**: Check your internet connection and RPC URL

### Issue: Contract verification fails
- **Solution**: Ensure you're using the exact constructor parameters and compiler version

## Security Checklist

Before deploying to mainnet:

- [ ] Audit smart contract code
- [ ] Test thoroughly on testnet
- [ ] Verify admin and royalty receiver addresses
- [ ] Ensure private keys are secured
- [ ] Review gas settings
- [ ] Set up proper access controls
- [ ] Document all deployment parameters

## Next Steps

After successful deployment:

1. **Test basic functionality** (mint, transfer, royalties)
2. **Set up monitoring** for contract events
3. **Configure frontend** with contract address
4. **Prepare metadata** for NFTs (IPFS hosting recommended)
5. **Plan initial minting** of legacy NFTs

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Scroll Documentation](https://docs.scroll.io/)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [ERC-2981 Standard](https://eips.ethereum.org/EIPS/eip-2981)
