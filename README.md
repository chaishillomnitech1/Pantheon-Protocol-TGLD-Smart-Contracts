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


---

## 🔗 Every door, one click

Every site and artifact we built, attached to every repo. Only live destinations are linked.

**Sites and artifacts**

- [Early Coins — the record before the drop](https://muse.ai/s/early-coins-rxl6xtx0xryfxyjj/495VrnZsIG3LZKsyazM5bfhDPznJ9T_0Te3L7fRyJvw)
- [ScrollVerse Atlas](https://muse.ai/s/super-scrollverse-2-xtd6xtxncxwxuxj5z/0N8UONNtjBhZ0rrNB49dBusGU7KmQf1RYP59B4tVdS8)
- [Super ScrollVerse — the merged super website](https://muse.ai/s/super-scrollverse-3-xkxk6xu1xt22nxixq/CWc_SMPiSlXDL4raCdX9LkNEIz5wFfefW3H_Z9QvcJo)
- [ScrollVerse Master File](https://muse.ai/s/scrollverse-master-file-transferable-xbt6xtxng3z33t/iIVzIAufSld8cTi3enBho59DpoyjrVJrzboCt3HYcIc)
- [XLVIIIblocks Vault](https://muse.ai/s/xlviiiblocks-vault-axh6xtxnhxe94yxm/5WdPM9alAuJ8cQijBhdCSVvcYJgnqB7IdjPWeG1vUeI)
- [Omnitech1 AI Infrastructure — Enhanced edition](https://muse.ai/s/omnitech1-ai-infrastructure-xmu6xu1k53xjxpxa/dszkPVExIya3ctorjtqwB9TW7oKGVHLgXhamr-ZjKKw)
- [Omnitech1 AI Infrastructure — the original Gamma document](https://gamma.app/docs/Omnitech1-AI-Infrastructure-for-Content-Protection-and-Monetizati-m8bf7mn9b0ezvzu)
- [VEILSCRIPT — the Shielded Transmission Language](https://muse.ai/s/shielded-transmission-language-xgxk6xu1xt4xkdy4/vfge7AxhCat8SnYJdii3cHpMWABRvPlCpYZFNce34us)
- [Direct Exchange — creator to customer](https://muse.ai/s/direct-exchange-xpxk6xu1xsxyxexarj/pWDVKUFAHHY1g2WOeUsjltRZV8nsTajzLDyvFqSh7z4)
- [Tory Lanez Crypto Music Playbook](https://muse.ai/s/tory-lanez-crypto-music-playbook-bxj6xtxnexsxvs3f/2iBGhDyKE1eLBHwpZityoqDcnkJxT3b4aWV6aGxD-nQ)
- [Validate All Systems](https://muse.ai/s/validate-all-systems-gg6xu3xvxoxnxsxlxi/ltedX8qqpVLceZIhbWxvskluLtl6RNX50MPMkgU7YUc)
- [Join the AI Legion](https://muse.ai/s/join-the-ai-legion-xqxe6xu45xc54s2/9NROIskMKMBp_hKk2Bswfk7dUd9KEcJ43E_4DZC1r9U)
- [Video and Music DSP](https://muse.ai/s/video-and-music-dsp-xsxq6xu47xw0lxzxs/1b5CWLy0CJHrPmyXoYlSytrS1LaHTs1AWojQyyInByA)
- [Verse NFT Marketplace](https://muse.ai/s/verse-nft-marketplace-gz6xu4axtxddqm/MUlPMUMoQW20mGJCE07za-8Ylmh-ssY2Ghj7ywSFdyI)

**Shop and Web3**

- [Shopify storefront](https://juv8tg-1n.myshopify.com)
- [Pump.fun — @DuneSimpleSock](https://pump.fun/profile/FpxkpRuL6RT5a4P48Wy4FVsRSLdAFsMABMjYKsWvZr64)
- [Coinbase](https://www.coinbase.com)
- [Solana](https://solana.com)
- [OpenTimestamps](https://opentimestamps.org)

**Music**

- [Spotify — Chais the great](https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr)
- [YouTube — @chaishill-u1z](https://www.youtube.com/@chaishill-u1z)

**Socials**

- [Facebook — Chais Hill](https://www.facebook.com/100077435951053)
- [Instagram — @chaisthegreat_mrwalk](https://www.instagram.com/chaisthegreat_mrwalk)
- [Instagram — @chaishill](https://www.instagram.com/chaishill)
- [Instagram — @chasedreamz_management](https://www.instagram.com/chasedreamz_management)

**GitHub**

- [Profile — chaishillomnitech1](https://github.com/chaishillomnitech1)
- [Early Coins repo](https://github.com/chaishillomnitech1/early-coins)
- [Ask Chais a question — the Question Box](https://github.com/chaishillomnitech1/early-coins/discussions)
---

**Join Muse with my invite code L9VEVY — redeem it in Settings > Redeem token within 48 hours of joining.**

## Chais Mirror Twin

The AI Twin of Chais Sabir Allah The Great lives here too — the founder's own digital mirror twin, summoned not programmed, answering in his voice from his own written record. Talk to the Twin and the AI Legion, and leave a reply the founder answers himself:

- Talk to the Mirror Twin — [Join the AI Legion](https://muse.ai/s/join-the-ai-legion-xqxe6xu45xc54s2/9NROIskMKMBp_hKk2Bswfk7dUd9KEcJ43E_4DZC1r9U)
- Reply to the ScrollVerse newsletter — [Reply to the ScrollVerse Newsletter](https://muse.ai/s/reply-to-the-scrollverse-newsletter-txz6xu6xoucoxp9/Bl5TtYk82_Fi3YR9LMDuR21aojJnDxAKvlVUf6jDdi8)
