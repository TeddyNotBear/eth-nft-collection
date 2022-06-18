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

export default function PublicMintNFT(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [ammount,setAmmount]=useState<string>('1')
  
    async function publicMintNft(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.publicMintNft(ammount, {value: ethers.utils.parseEther( (0.025 * Number(ammount)).toString() ) })
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("mint public nft receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    const handleChange = (value:string) => setAmmount(value)

    return (
        <form onSubmit={publicMintNft}>
            <FormControl>
                <FormLabel htmlFor='amount'>Amount: </FormLabel>
                <NumberInput defaultValue={ammount} min={1} max={3} onChange={handleChange}>
                    <NumberInputField />
                </NumberInput>
                <Button type="submit" isDisabled={!currentAccount}>Mint</Button>
            </FormControl>
        </form>
    )
}
