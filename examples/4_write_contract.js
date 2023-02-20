const { ethers } = require("ethers");

const INFURA_ID = '890d6bacdcd1477bbf0f90b8d192b924'
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account1 = '0x00Bb4D189f7E7070AbE41c09486038eD4010e45E' // Your account address 1
const account2 = '0x4bD1498f4ECCda92bD2E2D1bDa236A734Bf45961' // Your account address 2

const privateKey1 = '6fa8a68a50710a5d025f72a8664527742b00e272e27ef928f45a972896833788' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const senderBalanceBefore = await contract.balanceOf(account1)
    const recieverBalanceBefore = await contract.balanceOf(account2)

    console.log(`\nReading from ${address}\n`)
    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, senderBalanceBefore)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender after: ${balanceOfSender}`)
    console.log(`Balance of reciever after: ${balanceOfReciever}\n`)
}

main()