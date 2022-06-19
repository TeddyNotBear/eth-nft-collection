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

export default function BurnNFT(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [tokenId,setTokenId]=useState<string>('0')
  
    async function burnNft(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.burnNft(tokenId)
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("burn nft receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    const handleChange = (value:string) => setTokenId(value)

    return (
        <form onSubmit={burnNft}>
            <FormControl>
                <FormLabel htmlFor='tokenId'>Token id: </FormLabel>
                <NumberInput defaultValue={tokenId} onChange={handleChange}>
                    <NumberInputField />
                </NumberInput>
                <Button type="submit" isDisabled={!currentAccount}>Mint</Button>
            </FormControl>
        </form>
    )
}
