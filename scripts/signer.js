require("dotenv").config();

const ethers = require("ethers");
const fs = require("fs");
const addresses = require("./outputs/addresses.json");
const insertData = require("../firebase/firestore");
const signer = new ethers.Wallet(process.env.WALLET_PK);

const CONTRACT_ADDRESS = "0xA932B8209Cb5b817fE6dd0d55913bB7A8b7C6DBA";

const signedMessages = {};

const signAllAddress = async () => {
    // Sign messages whitelisted users. These signatures will
    // allow these addresses to claim either 3, 2 or 1 tokens
    for (const address of addresses) {
        // Construct message to sign.
        const hashedMessage = ethers.utils.solidityKeccak256(
            ["address", "address"],
            [CONTRACT_ADDRESS, address]
        );

        // Sign the message, update the signedMessages dict
        // storing only the signature value returned from .sign()
        const signature = await signer.signMessage(
            ethers.utils.arrayify(hashedMessage)
        );
        signedMessages[address] = signature;
        await insertData(address, signature);
    }
};

signAllAddress();