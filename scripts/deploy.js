const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying Pantheon Protocol contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy PantheonNFT
  const PantheonNFT = await hre.ethers.getContractFactory("PantheonNFT");
  
  // Use deployer as both admin and royalty receiver by default
  const defaultAdmin = deployer.address;
  const defaultRoyaltyReceiver = deployer.address;
  
  console.log("\nDeploying PantheonNFT...");
  console.log("Default Admin:", defaultAdmin);
  console.log("Default Royalty Receiver:", defaultRoyaltyReceiver);
  
  const pantheonNFT = await PantheonNFT.deploy(defaultAdmin, defaultRoyaltyReceiver);
  await pantheonNFT.waitForDeployment();
  
  const nftAddress = await pantheonNFT.getAddress();
  console.log("\n✅ PantheonNFT deployed to:", nftAddress);
  
  // Display contract information
  const name = await pantheonNFT.name();
  const symbol = await pantheonNFT.symbol();
  const totalSupply = await pantheonNFT.totalSupply();
  
  console.log("\nContract Information:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Total Supply:", totalSupply.toString());
  console.log("- Default Royalty Fee: 5% (500 basis points)");
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Verify the contract on Scrollscan (if on mainnet/testnet)");
  console.log("2. Grant MINTER_ROLE to authorized addresses");
  console.log("3. Start minting legacy NFTs for monumental Black achievers");
  
  return {
    pantheonNFT: nftAddress
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
