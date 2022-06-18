import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel, Grid } from '@chakra-ui/react'
import { ethers, Bytes} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import {NftCollectionABI as abi} from 'abi/NftCollectionABI'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ChangeSellingStep(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount

    async function launchPublicSale(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.launchPublicSale()
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("launch public sale receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    async function launchWhitelistedSale(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.launchWhitelistedSale()
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("launch whitelist sale receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    async function reveal(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.reveal()
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("launch whitelist sale receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    async function pause(event:React.FormEvent) {
        event.preventDefault()
        if(!window.ethereum) return    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftCollection:Contract = new ethers.Contract(addressContract, abi, signer)

        nftCollection.pause()
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("pause receipt", receipt)})
            })
            .catch((e:Error)=>console.log(e))
    }

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={3}>
            <form onSubmit={launchPublicSale}>
                <FormControl>
                    <Button type="submit" colorScheme='pink' w='100%'>
                        Launch public sale
                    </Button>
                </FormControl>
            </form>
            <form onSubmit={launchWhitelistedSale}>
                <FormControl>
                    <Button type="submit" colorScheme='purple' w='100%'>
                        Launch whitelist sale
                    </Button>
                </FormControl>
            </form>
            <form onSubmit={reveal}>
                <FormControl>
                    <Button type="submit" colorScheme='linkedin' w='100%'>
                       Reveal
                    </Button>
                </FormControl>
            </form>
            <form onSubmit={pause}>
                <FormControl>
                    <Button type="submit" colorScheme='facebook' w='100%'>
                       Pause
                    </Button>
                </FormControl>
            </form>
        </Grid>
    )

}