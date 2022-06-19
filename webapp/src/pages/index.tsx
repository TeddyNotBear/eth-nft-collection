import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import { ethers } from "ethers"
import ReadNftCollection from "../components/ReadNftCollection"
import PublicMintNFT from "../components/PublicMintNft"
import WhitelistMintNft from "../components/WhitelistMintNft"
import SetBaseURI from "../components/SetBaseURI"
import SetNotRevealedURI from "../components/SetNotRevealedURI"
import ChangeSellingStep from "../components/ChangeSellingStep"
import BurnNft from "../components/BurnNft"

declare let window: any
const CONTRACT_ADDRESS = "0x098Cd16b87df934362b445E3C0f32b0535c1D1C8"

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })
  },[currentAccount])

  const onClickConnect = () => {
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }
    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
      .then((accounts)=>{
        if(accounts.length>0) setCurrentAccount(accounts[0])
      })
      .catch((e)=>console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <>
      <Head>
        <title>AdvancedNFT Collection</title>
      </Head>

      <Heading as="h3"  my={4}>Advanced implementation of NFT collection</Heading>          
      <VStack>
        <Box w='100%' my={4}>
          {currentAccount  
            ? <Button type="button" colorScheme='green' w='100%' onClick={onClickDisconnect}>
                Account: {currentAccount}
              </Button>
            : <Button type="button" colorScheme='facebook' w='100%' onClick={onClickConnect}>
                Connect MetaMask
              </Button>
          }
        </Box>
        {currentAccount  
          ? <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
              <Heading my={4}  fontSize='xl'>Account info</Heading>
              <Text><b>ETH Balance of current account: </b>{balance}</Text>
              <Text><b>Chain Info:</b> ChainId {chainId} name {chainname}</Text>
            </Box>
          : <></>
        }
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Read Contract Info</Heading>
          <ReadNftCollection 
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Change selling step</Heading>
          <ChangeSellingStep 
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Set base URI</Heading>
          <SetBaseURI 
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Set not revealed URI</Heading>
          <SetNotRevealedURI 
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Whitelist Mint Nft</Heading>
          <WhitelistMintNft 
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Public Mint Nft</Heading>
          <PublicMintNFT
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Burn Nft</Heading>
          <BurnNft
            addressContract={CONTRACT_ADDRESS}
            currentAccount={currentAccount}
          />
        </Box>
      </VStack>
    </>
  )
}

export default Home