import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import { Box } from '@mui/material'

const WalletConnect = () => {
  return (
    <Box display="flex" alignItems="center" p={2} width='285px' height='50px' padding="0px 30px" borderRadius='25px'  bgcolor='cardBackgroundColor.main'>
        <ConnectWallet theme="light"/>
    </Box>
  )
}

export default WalletConnect
