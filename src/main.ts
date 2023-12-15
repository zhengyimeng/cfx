import { BrowserProvider, Contract } from "ethers";
import ABI from "./abi.json";

const provider = new BrowserProvider(window.ethereum);

const contractAddress = "0xc6e865c213c89ca42a622c5572d19f00d84d7a16";
const contract = new Contract(contractAddress, ABI, provider);

const button = document.createElement("button");
button.innerHTML = "click mint";
document.body.append(button);

button.addEventListener("click", async () => {
  console.log("mint start");
  const signer = contract.connect(await provider.getSigner()) as Contract;
  const result = await signer.CreateCFXs();
  console.log(result);
  await result?.wait();
  console.log("wait success");
});
