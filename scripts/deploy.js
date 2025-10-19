const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");
  
  // Get the contract factory
  const Token = await hre.ethers.getContractFactory("Token");
  
  // Deploy the contract
  console.log("Deploying Token contract...");
  const token = await Token.deploy();
  
  // Wait for deployment to finish
  await token.waitForDeployment();
  
  const tokenAddress = await token.getAddress();
  
  console.log("\n=================================");
  console.log("Token deployed successfully!");
  console.log("=================================");
  console.log("Contract Address:", tokenAddress);
  console.log("=================================");
  console.log("\nIMPORTANT: Copy the address above and update it in:");
  console.log("frontend/src/composables/useWeb3.js");
  console.log("Look for: const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE'");
  console.log("=================================\n");
  
  // Get token info
  const name = await token.name();
  const symbol = await token.symbol();
  const totalSupply = await token.totalSupply();
  const decimals = await token.decimals();
  
  console.log("Token Details:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Decimals:", decimals.toString());
  console.log("- Total Supply:", hre.ethers.formatEther(totalSupply), symbol);
  console.log("=================================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });