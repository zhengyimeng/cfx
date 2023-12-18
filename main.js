const { JsonRpcProvider, Contract, Wallet } = require("ethers");
const ABI = require("./abi.json");

const contractAddress = "0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
const contract = new Contract(contractAddress, ABI, rpcProvider);

const privateKeys = []; // 私钥

const mintCfx = async (privateKey, provider) => {
  console.log("mint start ------");
  const wallet = new Wallet(privateKey, provider);
  const signer = contract.connect(wallet);
  const result = await signer.CreateCFXs();
  const tx = await result?.wait();
  console.log("success -----");
  console.log(tx.hash);
};

function main() {
  for (let i = 0; i < privateKeys.length; i++) {
    const rpcProvider = new JsonRpcProvider(
      "https://conflux-espace.rpc.thirdweb.com",
      0x406
    );
    const privateKey = privateKeys[i];
    while (true) {
      try {
        mintCfx(privateKey, rpcProvider);
      } catch (error) {
        console.log("Error", error);
      }
    }
  }
}

main();
