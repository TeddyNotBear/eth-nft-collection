import React, { useEffect,useState } from 'react'
import { Text } from '@chakra-ui/react'
import {AdvancedNFTABI as abi} from 'abi/AdvancedNFTABI'
import { ethers } from 'ethers'

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadAdvancedNFT(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount

    const [maxSupplyNft, setMaxSupplyNft] = useState<string>()
    const [nftsSold, setNftsSold] = useState<string>()
    const [publicSaleNftPrice, setPublicSaleNftPrice] = useState<string>()
    const [whitelistSaleNftPrice, setWhitelistSaleNftPrice] = useState<string>()
    const [symbol,setSymbol] = useState<string>("")
    const [balance, SetBalance] = useState<number|undefined>(undefined)

    useEffect(()=>{
        if(!window.ethereum) return
        if(!currentAccount) return
    
        queryTokenBalance(window)
    },[currentAccount])

    async function queryTokenBalance(window:any){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const advancedNft = new ethers.Contract(addressContract, abi, provider)
    
        advancedNft.balanceOf(currentAccount)
        .then((result:string)=>{
            SetBalance(Number(result))
        })
        .catch('error', console.error)
    }

    useEffect(() => {
        if(!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const advancedNft = new ethers.Contract(addressContract, abi, provider)

        advancedNft.getInitialTotalSupply().then((result:string)=>{
            setMaxSupplyNft(ethers.utils.formatEther(result))
        }).catch('error', console.error)

        advancedNft.totalSupply().then((result:string)=>{
            setNftsSold(ethers.utils.formatEther(result))
        }).catch('error', console.error)

        advancedNft.getPublicSaleNftPrice().then((result:string)=>{
            setPublicSaleNftPrice(ethers.utils.formatEther(result))
        }).catch('error', console.error)

        advancedNft.getWhitelistSaleNftPrice().then((result:string)=>{
            setWhitelistSaleNftPrice(ethers.utils.formatEther(result))
        }).catch('error', console.error)

        advancedNft.symbol().then((result:string)=>{
            setSymbol(result)
        }).catch('error', console.error)
    }) 

    return (
        <div>
            <Text><b>ReadAdvancedNFT Contract</b>: {addressContract}</Text>
            <Text><b>Nft total supply: </b>{ maxSupplyNft } {symbol}</Text>
            <Text><b>Number of nfts sold: </b>{ nftsSold } {symbol}</Text>
            <Text><b>Nft price for public sale: </b>{ publicSaleNftPrice }</Text>
            <Text><b>Nft price for whitelist sale: </b>{ whitelistSaleNftPrice }</Text>
            <Text my={4}><b>AdvancedNFT token in current account: </b>{balance} {symbol}</Text>
        </div>
    )
}