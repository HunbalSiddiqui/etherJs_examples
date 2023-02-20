const { ethers } = require("ethers");

const INFURA_ID = '890d6bacdcd1477bbf0f90b8d192b924'
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account1 = '0x00Bb4D189f7E7070AbE41c09486038eD4010e45E' // Your account address 1 - sender
const account2 = '0x4bD1498f4ECCda92bD2E2D1bDa236A734Bf45961' // Your account address 2 - recipient

const privateKey1 = '6fa8a68a50710a5d025f72a8664527742b00e272e27ef928f45a972896833788' // Private key of account 1 - sender
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.0025")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()


