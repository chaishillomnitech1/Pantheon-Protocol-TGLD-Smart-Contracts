const hre = require("hardhat");

/**
 * Example script demonstrating how to interact with the PantheonNFT contract
 * This shows minting legacy NFTs for monumental Black achievers
 */

async function main() {
  const [deployer, minter, recipient] = await hre.ethers.getSigners();

  // Replace with your deployed contract address
  const PANTHEON_NFT_ADDRESS = process.env.PANTHEON_NFT_ADDRESS || "0x...";

  console.log("Interacting with PantheonNFT at:", PANTHEON_NFT_ADDRESS);
  console.log("Using account:", deployer.address);

  // Get contract instance
  const pantheonNFT = await hre.ethers.getContractAt("PantheonNFT", PANTHEON_NFT_ADDRESS);

  // Contract information
  console.log("\n=== Contract Information ===");
  console.log("Name:", await pantheonNFT.name());
  console.log("Symbol:", await pantheonNFT.symbol());
  console.log("Total Supply:", (await pantheonNFT.totalSupply()).toString());

  // Example achievers to immortalize
  const achievers = [
    {
      name: "Dr. Mae Jemison",
      category: "Scientist",
      birthYear: 1956,
      uri: "ipfs://QmExampleHash1",
      description: "First African American woman astronaut in space"
    },
    {
      name: "Katherine Johnson",
      category: "Mathematician",
      birthYear: 1918,
      uri: "ipfs://QmExampleHash2",
      description: "NASA mathematician whose calculations were critical to space missions"
    },
    {
      name: "Jean-Michel Basquiat",
      category: "Artist",
      birthYear: 1960,
      uri: "ipfs://QmExampleHash3",
      description: "Influential Neo-expressionist artist"
    }
  ];

  // Mint legacy NFTs
  console.log("\n=== Minting Legacy NFTs ===");
  
  for (let i = 0; i < achievers.length; i++) {
    const achiever = achievers[i];
    console.log(`\nMinting NFT ${i + 1}/${achievers.length}`);
    console.log(`Achiever: ${achiever.name}`);
    console.log(`Category: ${achiever.category}`);
    
    try {
      const tx = await pantheonNFT.mintLegacy(
        recipient.address,
        achiever.name,
        achiever.category,
        achiever.birthYear,
        achiever.uri
      );
      
      console.log("Transaction hash:", tx.hash);
      const receipt = await tx.wait();
      console.log("✅ Minted successfully!");
      
      // Get token ID from event
      const event = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'LegacyMinted'
      );
      
      if (event) {
        const tokenId = event.args[0];
        console.log("Token ID:", tokenId.toString());
      }
      
    } catch (error) {
      console.error("❌ Error minting:", error.message);
    }
  }

  // Query legacy data
  const totalSupply = await pantheonNFT.totalSupply();
  console.log("\n=== Querying Legacy Data ===");
  console.log("Current Total Supply:", totalSupply.toString());

  if (totalSupply > 0n) {
    // Query first token
    const tokenId = 0;
    const legacyData = await pantheonNFT.getLegacyMetadata(tokenId);
    const owner = await pantheonNFT.ownerOf(tokenId);
    const tokenURI = await pantheonNFT.tokenURI(tokenId);
    
    console.log(`\nToken #${tokenId} Details:`);
    console.log("- Achiever:", legacyData.achieverName);
    console.log("- Category:", legacyData.category);
    console.log("- Birth Year:", legacyData.birthYear.toString());
    console.log("- Mint Timestamp:", new Date(Number(legacyData.mintTimestamp) * 1000).toISOString());
    console.log("- Minted By:", legacyData.minter);
    console.log("- Current Owner:", owner);
    console.log("- Token URI:", tokenURI);
  }

  // Query royalty info
  console.log("\n=== Royalty Information ===");
  const salePrice = hre.ethers.parseEther("1.0");
  
  if (totalSupply > 0n) {
    const [receiver, royaltyAmount] = await pantheonNFT.royaltyInfo(0, salePrice);
    console.log("For a sale of 1 ETH:");
    console.log("- Royalty Receiver:", receiver);
    console.log("- Royalty Amount:", hre.ethers.formatEther(royaltyAmount), "ETH");
    console.log("- Royalty Percentage:", (Number(royaltyAmount) * 100 / Number(salePrice)).toFixed(2) + "%");
  }

  // Update royalty example (requires admin role)
  console.log("\n=== Updating Royalty (if admin) ===");
  try {
    const DEFAULT_ADMIN_ROLE = await pantheonNFT.DEFAULT_ADMIN_ROLE();
    const isAdmin = await pantheonNFT.hasRole(DEFAULT_ADMIN_ROLE, deployer.address);
    
    if (isAdmin && totalSupply > 0n) {
      console.log("Setting custom royalty for token 0 to 10%...");
      const tx = await pantheonNFT.setTokenRoyalty(0, deployer.address, 1000);
      await tx.wait();
      console.log("✅ Royalty updated!");
      
      // Verify new royalty
      const [newReceiver, newAmount] = await pantheonNFT.royaltyInfo(0, salePrice);
      console.log("New royalty amount:", hre.ethers.formatEther(newAmount), "ETH (10%)");
    } else {
      console.log("Skipping royalty update (not admin or no tokens)");
    }
  } catch (error) {
    console.error("Error updating royalty:", error.message);
  }

  // Grant minter role example
  console.log("\n=== Role Management ===");
  const MINTER_ROLE = await pantheonNFT.MINTER_ROLE();
  const hasMinterRole = await pantheonNFT.hasRole(MINTER_ROLE, deployer.address);
  console.log("Deployer has MINTER_ROLE:", hasMinterRole);

  console.log("\n✅ Example script completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
