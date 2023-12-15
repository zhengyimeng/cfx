import { BrowserProvider, Contract, Wallet } from "ethers";
import ABI from "./abi.json";

const provider = new BrowserProvider(window.ethereum, 0x406);

const contractAddress = "0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
const contract = new Contract(contractAddress, ABI, provider);

const input = document.createElement("input");
input.placeholder = "钱包私钥";
input.style.cssText = "width: 300px; height: 44px";
document.body.append(input);

const button = document.createElement("button");
button.innerHTML = "click mint";
button.style.cssText = "height: 44px";
document.body.append(button);

button.addEventListener("click", async () => {
  const wallet = new Wallet(input.value, provider);

  let count = 1;
  const mintCfx = async () => {
    console.log("mint start ------", count);
    const signer = contract.connect(wallet) as Contract;
    const result = await signer.CreateCFXs();
    await result?.wait();
    console.log("success", count);
  };

  while (true) {
    try {
      await mintCfx();
    } catch (error) {
      console.log(error.message);
      console.log("error", count);
    } finally {
      count += 1;
    }
  }
});
