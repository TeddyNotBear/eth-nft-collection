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

export default function SetBaseURI(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [newBaseURI,setNewBaseURI]=useState<string>('')
  
    async function setBaseURI(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.setBaseURI(newBaseURI)
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("set base uri receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    const handleChange = (value:string) => setNewBaseURI(value)

    return (
        <form onSubmit={setBaseURI}>
            <FormControl>
                <FormLabel htmlFor='amount'>Base URI: </FormLabel>
                <Input value={newBaseURI} placeholder="ipfs://put-your-ipfs-cid-here/" onChange={(e) => handleChange(e.target.value)}/>
                <Button type="submit" isDisabled={!currentAccount}>Set</Button>
            </FormControl>
        </form>
    )
}
