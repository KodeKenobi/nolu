import hre from "hardhat";
import { ethers as ethersLib } from "ethers";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { HDNodeWallet, Mnemonic } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Workaround for ES modules: @nomicfoundation/hardhat-ethers plugin doesn't load hre.ethers correctly
  // We'll use the ethers library directly with Hardhat's provider
  const provider = new ethersLib.JsonRpcProvider("http://127.0.0.1:8545");

  const defaultPrivateKey =
    process.env.DEFAULT_PRIVATE_KEY ||
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const deployer = new ethersLib.Wallet(defaultPrivateKey, provider);

  // Load the contract artifact
  const artifact = await hre.artifacts.readArtifact("MyToken");

  // Create contract factory and deploy with constructor arguments
  // MyToken requires initialSupply (uint256) as constructor argument
  const Factory = new ethersLib.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    deployer
  );

  // Deploy with initial supply of 1000000 tokens
  const initialSupply = BigInt(1000000);
  const contract = await Factory.deploy(initialSupply);

  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log("Deployed to:", deployedAddress);

  // Update config.ts with the deployed address
  try {
    const configPath = join(process.cwd(), "app", "config.ts");
    let configContent = await readFile(configPath, "utf-8");

    // Replace MyToken addresses in DEFAULT_TOKENS and POPULAR_TOKENS
    // The default Hardhat address that gets replaced
    const defaultHardhatAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // Replace all occurrences of the default address (used for MyToken)
    configContent = configContent.replace(
      new RegExp(defaultHardhatAddress, "g"),
      deployedAddress
    );

    await writeFile(configPath, configContent, "utf-8");
    console.log(
      `✅ Updated app/config.ts with deployed address: ${deployedAddress}`
    );
  } catch (error) {
    console.error("⚠️  Failed to update config.ts:", error);
    console.log("Please manually update the address in app/config.ts");
  }

  // Get all Hardhat accounts and save them for the frontend
  try {
    // Hardhat's default mnemonic: "test test test test test test test test test test test junk"
    const mnemonic = Mnemonic.fromPhrase(
      "test test test test test test test test test test test junk"
    );

    const accounts: Array<{ address: string; name: string; label?: string }> =
      [];

    // Generate first 20 accounts (Hardhat default)
    // Use BIP44 standard derivation: m/44'/60'/0'/0/i
    for (let i = 0; i < 20; i++) {
      // Create wallet from mnemonic with the full derivation path
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
      const address = wallet.address;

      // Skip the deployer account (index 0) as it's already the connected account
      if (i === 0) {
        accounts.push({
          address,
          name: "Deployer Account",
          label: "Your main account",
        });
      } else {
        accounts.push({
          address,
          name: `Test Account ${i + 1}`,
          label: `Hardhat account #${i}`,
        });
      }
    }

    // Save to public directory so frontend can access it
    const addressesPath = join(
      process.cwd(),
      "public",
      "hardhat-addresses.json"
    );
    await writeFile(addressesPath, JSON.stringify(accounts, null, 2), "utf-8");
    console.log(
      `✅ Saved ${accounts.length} Hardhat accounts to public/hardhat-addresses.json`
    );
    console.log("   These addresses will be available in the transfer modal");
  } catch (error) {
    console.error("⚠️  Failed to save Hardhat accounts:", error);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
