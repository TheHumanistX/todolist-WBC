import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import { Box } from '@mui/material'

const WalletConnect = () => {
  return (
        <>
        <ConnectWallet theme="light" className="connectButton" />
        </>
  )
}

export default WalletConnect
