// Import necessary libraries and components from React, Material-UI and thirdweb-dev.
import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";

// Define the WalletConnect functional component.
const WalletConnect = ({ theme }) => {
  const buttonClassName = theme === 'dark' ? 'connectButton dark' : 'connectButton light';
  // Return a ConnectWallet component with the light theme and connectButton class.
  // This is the only component we apply any CSS styling to. It is in index.css
  return (
    <ConnectWallet className={buttonClassName} />
  )
}

// Export the WalletConnect component as the default export from this module.
export default WalletConnect
