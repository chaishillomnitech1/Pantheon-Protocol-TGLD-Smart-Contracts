# Pantheon Protocol - TGLD Smart Contracts

**Preserve and immortalize the legacies of monumental Black achievers in the ScrollVerse.**

This protocol binds their stories, art, and cultural impact into NFTs, using smart contracts for heritage preservation and perpetual equity. Fueled by the ScrollVerse, we ensure their contributions echo eternally.

## 🌟 Overview

The Pantheon Protocol enables the immortalization of monumental Black achievers by embedding their stories, art, and cultural legacies into the ScrollVerse as NFTs. Each digital artifact utilizes smart contracts to preserve their heritage while distributing equity through perpetual royalties.

### Key Features

- **🎨 Heritage Preservation**: Each NFT captures the complete legacy of Black achievers including their stories, achievements, and cultural impact
- **💰 Perpetual Royalties**: ERC-2981 standard implementation ensures creators and heritage keepers receive ongoing compensation
- **🔒 Access Control**: Role-based minting system to maintain quality and authenticity
- **📊 Rich Metadata**: On-chain storage of achiever information including name, category, birth year, and mint timestamp
- **⛓️ ScrollVerse Integration**: Deployed on Scroll network for efficient, scalable operations

## 📋 Smart Contracts

### PantheonNFT

The main NFT contract implementing:
- **ERC-721**: Standard NFT functionality
- **ERC-2981**: Royalty standard for perpetual equity distribution
- **AccessControl**: Role-based permissions for minting

**Key Components:**
- `MINTER_ROLE`: Permission to mint new legacy NFTs
- `DEFAULT_ROYALTY_FEE`: 5% (500 basis points) standard royalty
- Legacy metadata storage for each achiever

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ (v22.10.0+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chaishillomnitech1/Pantheon-Protocol-TGLD-Smart-Contracts.git
cd Pantheon-Protocol-TGLD-Smart-Contracts

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env
```

### Configuration

Edit `.env` file with your settings:

```env
SCROLL_SEPOLIA_RPC_URL=https://sepolia-rpc.scroll.io/
SCROLL_RPC_URL=https://rpc.scroll.io/
PRIVATE_KEY=your_private_key_here
SCROLLSCAN_API_KEY=your_scrollscan_api_key
```

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy

```bash
# Deploy to local Hardhat network
npm run deploy:local

# Deploy to Scroll Sepolia testnet
npm run deploy:scroll-sepolia

# Deploy to Scroll mainnet
npm run deploy:scroll
```

## 📖 Usage

### Minting a Legacy NFT

```javascript
// Get contract instance
const pantheonNFT = await ethers.getContractAt("PantheonNFT", contractAddress);

// Mint a legacy NFT
await pantheonNFT.mintLegacy(
  recipientAddress,
  "Dr. Mae Jemison",           // Achiever name
  "Scientist",                 // Category
  1956,                        // Birth year
  "ipfs://QmHash..."           // Token URI (metadata)
);
```

### Setting Royalties

```javascript
// Set token-specific royalty (10%)
await pantheonNFT.setTokenRoyalty(
  tokenId,
  royaltyReceiverAddress,
  1000  // 10% in basis points
);

// Update default royalty for all new tokens
await pantheonNFT.setDefaultRoyalty(
  royaltyReceiverAddress,
  750  // 7.5% in basis points
);
```

### Querying Legacy Data

```javascript
// Get legacy metadata
const legacy = await pantheonNFT.getLegacyMetadata(tokenId);
console.log(legacy.achieverName);  // "Dr. Mae Jemison"
console.log(legacy.category);      // "Scientist"
console.log(legacy.birthYear);     // 1956

// Get royalty info for a sale
const salePrice = ethers.parseEther("1.0");
const [receiver, royaltyAmount] = await pantheonNFT.royaltyInfo(tokenId, salePrice);
```

## 🏗️ Architecture

### Contract Structure

```
PantheonNFT
├── ERC721 (Base NFT functionality)
├── ERC721URIStorage (Token URI management)
├── ERC2981 (Royalty standard)
└── AccessControl (Role-based permissions)
```

### Legacy Metadata Structure

```solidity
struct LegacyMetadata {
    string achieverName;    // Name of the achiever
    string category;        // Achievement category
    uint256 birthYear;      // Birth year
    uint256 mintTimestamp;  // When the NFT was minted
    address minter;         // Who minted it
}
```

## 🧪 Testing

The project includes comprehensive test coverage:

- ✅ Deployment and initialization
- ✅ Minting functionality and access control
- ✅ Royalty management and calculations
- ✅ Metadata storage and retrieval
- ✅ Token transfers and ownership
- ✅ Interface compliance (ERC721, ERC2981, AccessControl)

Run tests with:
```bash
npm test
```

## 🔐 Security

- Access control for sensitive operations
- ERC standards compliance
- OpenZeppelin battle-tested contracts
- Comprehensive test coverage

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

## 🌐 Networks

### Scroll Sepolia (Testnet)
- Chain ID: 534351
- RPC: https://sepolia-rpc.scroll.io/
- Explorer: https://sepolia.scrollscan.com/

### Scroll (Mainnet)
- Chain ID: 534352
- RPC: https://rpc.scroll.io/
- Explorer: https://scrollscan.com/

---

**Built with ❤️ to honor and immortalize the legacies of monumental Black achievers in the ScrollVerse.**

