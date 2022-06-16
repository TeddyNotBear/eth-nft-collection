import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {AdvancedNFTABI as abi} from 'abi/AdvancedNFTABI'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function Initialize(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [name,setName] = useState<string>('')
    const [symbol,setSymbol] = useState<string>('')
  
    async function initialize(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const advancedNft:Contract = new ethers.Contract(addressContract, abi, signer)

        advancedNft.initialize(name, symbol)
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("mint public nft receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    const handleChangeName = (value:string) => setName(value)
    const handleChangeSymbol = (value:string) => setSymbol(value)

    return (
        <form onSubmit={initialize}>
            <FormControl>
                <FormLabel htmlFor='name'>Name: </FormLabel>
                <Input value={name} onChange={(e) => handleChangeName(e.target.value)}/>
                <FormLabel htmlFor='symbol'>Symbol: </FormLabel>
                <Input value={symbol} onChange={(e) => handleChangeSymbol(e.target.value)}/>
                <Button type="submit" isDisabled={!currentAccount}>Initialize</Button>
            </FormControl>
        </form>
    )
}
