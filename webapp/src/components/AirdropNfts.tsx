import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {NftCollectionABI as abi} from 'abi/NftCollectionABI'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function AirdropNfts(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [recipient,setRecipient]=useState<string>('')
    const [mintAmount,setMintAmount]=useState<string>('')
  
    async function airdropNfts(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.airdropNfts(recipient, mintAmount)
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("airdrop nfts receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    const handleChangeRecipient = (value:string) => setRecipient(value)
    const handleChangeMintAmount = (value:string) => setMintAmount(value)

    return (
        <form onSubmit={airdropNfts}>
            <FormControl>
                <FormLabel htmlFor='recipient'>Recipient: </FormLabel>
                <Input value={recipient} onChange={(e) => handleChangeRecipient(e.target.value)}/>
                <FormLabel htmlFor='mint-amount'>Amount: </FormLabel>
                <NumberInput defaultValue={mintAmount} onChange={handleChangeMintAmount}>
                    <NumberInputField />
                </NumberInput>
                <Button type="submit" isDisabled={!currentAccount}>Airdrop</Button>
            </FormControl>
        </form>
    )
}
