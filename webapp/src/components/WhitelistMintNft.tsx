import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import { ethers, Bytes} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {AdvancedNFTABI as abi} from 'abi/AdvancedNFTABI'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"
import { useFirestore } from 'hooks/firestore/useFirestore';

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function WhitelistMintNFT(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [ammount,setAmmount]=useState<string>('1')

    const { getSignature } = useFirestore();
  
    async function whitelistMintNFT(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const advancedNft:Contract = new ethers.Contract(addressContract, abi, signer)

        const signerAddress = await signer.getAddress();
        const signature = await getSignature(signerAddress);

       advancedNft.whitelistMint(ammount, signature, {value: ethers.utils.parseEther( (0.025 * Number(ammount)).toString() ) })
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("mint whitelist nft receipt", receipt)})
            })
            .catch((e:Error)=>console.error(e))

    }

    const handleChange = (value:string) => setAmmount(value)

    return (
        <form onSubmit={whitelistMintNFT}>
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
