const { expect } = require("chai");
const hre = require("hardhat");

const { ethers } = hre;

describe("PantheonNFT", function () {
  let pantheonNFT;
  let owner;
  let minter;
  let user1;
  let user2;
  let royaltyReceiver;

  const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
  const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;

  beforeEach(async function () {
    [owner, minter, user1, user2, royaltyReceiver] = await ethers.getSigners();

    const PantheonNFT = await ethers.getContractFactory("PantheonNFT");
    pantheonNFT = await PantheonNFT.deploy(owner.address, royaltyReceiver.address);
    await pantheonNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await pantheonNFT.name()).to.equal("Pantheon Protocol Legacy");
      expect(await pantheonNFT.symbol()).to.equal("PANTHEON");
    });

    it("Should grant DEFAULT_ADMIN_ROLE to owner", async function () {
      expect(await pantheonNFT.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });

    it("Should grant MINTER_ROLE to owner", async function () {
      expect(await pantheonNFT.hasRole(MINTER_ROLE, owner.address)).to.be.true;
    });

    it("Should set default royalty receiver", async function () {
      const salePrice = ethers.parseEther("1");
      const royaltyInfo = await pantheonNFT.royaltyInfo(0, salePrice);
      expect(royaltyInfo[0]).to.equal(royaltyReceiver.address);
    });

    it("Should have initial total supply of 0", async function () {
      expect(await pantheonNFT.totalSupply()).to.equal(0);
    });
  });

  describe("Minting Legacy NFTs", function () {
    const achieverName = "Dr. Mae Jemison";
    const category = "Scientist";
    const birthYear = 1956;
    const tokenURI = "ipfs://QmTest123";

    it("Should allow minter to mint a legacy NFT", async function () {
      await expect(
        pantheonNFT.mintLegacy(user1.address, achieverName, category, birthYear, tokenURI)
      )
        .to.emit(pantheonNFT, "LegacyMinted")
        .withArgs(0, user1.address, achieverName, category, tokenURI);

      expect(await pantheonNFT.ownerOf(0)).to.equal(user1.address);
      expect(await pantheonNFT.tokenURI(0)).to.equal(tokenURI);
      expect(await pantheonNFT.totalSupply()).to.equal(1);
    });

    it("Should store legacy metadata correctly", async function () {
      await pantheonNFT.mintLegacy(user1.address, achieverName, category, birthYear, tokenURI);

      const legacyData = await pantheonNFT.getLegacyMetadata(0);
      expect(legacyData.achieverName).to.equal(achieverName);
      expect(legacyData.category).to.equal(category);
      expect(legacyData.birthYear).to.equal(birthYear);
      expect(legacyData.minter).to.equal(owner.address);
    });

    it("Should not allow non-minter to mint", async function () {
      await expect(
        pantheonNFT.connect(user1).mintLegacy(user2.address, achieverName, category, birthYear, tokenURI)
      ).to.be.reverted;
    });

    it("Should allow admin to grant minter role", async function () {
      await pantheonNFT.grantRole(MINTER_ROLE, minter.address);
      expect(await pantheonNFT.hasRole(MINTER_ROLE, minter.address)).to.be.true;

      await expect(
        pantheonNFT.connect(minter).mintLegacy(user1.address, achieverName, category, birthYear, tokenURI)
      ).to.emit(pantheonNFT, "LegacyMinted");
    });

    it("Should increment token IDs correctly", async function () {
      await pantheonNFT.mintLegacy(user1.address, "Achiever 1", "Artist", 1950, "ipfs://1");
      await pantheonNFT.mintLegacy(user2.address, "Achiever 2", "Leader", 1960, "ipfs://2");

      expect(await pantheonNFT.ownerOf(0)).to.equal(user1.address);
      expect(await pantheonNFT.ownerOf(1)).to.equal(user2.address);
      expect(await pantheonNFT.totalSupply()).to.equal(2);
    });
  });

  describe("Royalty Management", function () {
    beforeEach(async function () {
      await pantheonNFT.mintLegacy(user1.address, "Test Achiever", "Artist", 1960, "ipfs://test");
    });

    it("Should return correct default royalty info", async function () {
      const salePrice = ethers.parseEther("1");
      const royaltyInfo = await pantheonNFT.royaltyInfo(0, salePrice);
      
      const expectedRoyalty = (salePrice * 500n) / 10000n; // 5%
      expect(royaltyInfo[0]).to.equal(royaltyReceiver.address);
      expect(royaltyInfo[1]).to.equal(expectedRoyalty);
    });

    it("Should allow admin to set token-specific royalty", async function () {
      const newReceiver = user2.address;
      const newFee = 1000; // 10%

      await expect(
        pantheonNFT.setTokenRoyalty(0, newReceiver, newFee)
      )
        .to.emit(pantheonNFT, "RoyaltyUpdated")
        .withArgs(0, newReceiver, newFee);

      const salePrice = ethers.parseEther("1");
      const royaltyInfo = await pantheonNFT.royaltyInfo(0, salePrice);
      
      expect(royaltyInfo[0]).to.equal(newReceiver);
      expect(royaltyInfo[1]).to.equal(ethers.parseEther("0.1")); // 10% of 1 ETH
    });

    it("Should not allow non-admin to set token royalty", async function () {
      await expect(
        pantheonNFT.connect(user1).setTokenRoyalty(0, user1.address, 1000)
      ).to.be.reverted;
    });

    it("Should allow admin to update default royalty", async function () {
      const newReceiver = user2.address;
      const newFee = 750; // 7.5%

      await pantheonNFT.setDefaultRoyalty(newReceiver, newFee);

      // Mint a new token to test new default royalty
      await pantheonNFT.mintLegacy(user1.address, "New Achiever", "Scientist", 1970, "ipfs://new");

      const salePrice = ethers.parseEther("1");
      const royaltyInfo = await pantheonNFT.royaltyInfo(1, salePrice);

      expect(royaltyInfo[0]).to.equal(newReceiver);
      expect(royaltyInfo[1]).to.equal(ethers.parseEther("0.075")); // 7.5% of 1 ETH
    });
  });

  describe("Metadata and Queries", function () {
    it("Should revert when querying non-existent token", async function () {
      await expect(
        pantheonNFT.getLegacyMetadata(999)
      ).to.be.revertedWith("PantheonNFT: Token does not exist");
    });

    it("Should return token URI for existing token", async function () {
      const uri = "ipfs://QmTestAchievementHash";
      await pantheonNFT.mintLegacy(user1.address, "Test", "Artist", 1950, uri);
      
      expect(await pantheonNFT.tokenURI(0)).to.equal(uri);
    });
  });

  describe("Interface Support", function () {
    it("Should support ERC721 interface", async function () {
      expect(await pantheonNFT.supportsInterface("0x80ac58cd")).to.be.true;
    });

    it("Should support ERC2981 (royalty) interface", async function () {
      expect(await pantheonNFT.supportsInterface("0x2a55205a")).to.be.true;
    });

    it("Should support AccessControl interface", async function () {
      expect(await pantheonNFT.supportsInterface("0x7965db0b")).to.be.true;
    });
  });

  describe("Token Transfers", function () {
    beforeEach(async function () {
      await pantheonNFT.mintLegacy(user1.address, "Transfer Test", "Leader", 1940, "ipfs://transfer");
    });

    it("Should allow owner to transfer token", async function () {
      await pantheonNFT.connect(user1).transferFrom(user1.address, user2.address, 0);
      expect(await pantheonNFT.ownerOf(0)).to.equal(user2.address);
    });

    it("Should preserve legacy metadata after transfer", async function () {
      await pantheonNFT.connect(user1).transferFrom(user1.address, user2.address, 0);
      
      const legacyData = await pantheonNFT.getLegacyMetadata(0);
      expect(legacyData.achieverName).to.equal("Transfer Test");
      expect(legacyData.category).to.equal("Leader");
    });
  });
});
