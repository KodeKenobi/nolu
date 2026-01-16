import "hardhat/types";
import type { HardhatEthersHelpers } from "@nomicfoundation/hardhat-ethers/types";

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    ethers: HardhatEthersHelpers;
  }
}
