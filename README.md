# Solana spl-token deploy

We use [testnet](https://api.testnet.solana.com) for this demo!

## Required Dependencies

- install solana cli: https://docs.solana.com/cli/install-solana-cli-tools
- install js dependencies
``` 
npm install --save @solana/web3.js
npm i @project-serum/anchor
npm i @metaplex-foundation/mpl-token-metadata
```


## Steps

- `create wallet`: solana-keygen new (default keypair ~/.config/solana/id.json)
- `airdrop`: solana airdrop 1 (or goto https://faucet.solana.com/)

```
solana airdrop 1
Requesting airdrop of 1 SOL

Signature: 5eePiVAEuhADN7XqJM9TCSBQkHGwoWF3xL9mBwSyPZ3p4agtdKGPNTLRXXvaVtp7vQixGUkyShyTNUhDdAnQGqmh

10.9908574 SOL
```

- `create token`: spl-token create-token

```
spl-token create-token
Creating token B8sHjn5bo6Xum82Zq2hq43DY979LGwZ86nUgGYi7FkiX under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  B8sHjn5bo6Xum82Zq2hq43DY979LGwZ86nUgGYi7FkiX
Decimals:  9

Signature: 2nipCTwtdAd8SiRVWoUwQLsEqrQqvgwT5md9zcbXjnaKKocHxqDKi81Mt67U8rFMK9FzS9puWvojpR2CMSda6sFv
```

- `update token-metadata`

To add metadata, update data in `inital.ts`
```
// Solana network endpoint
const endpoint = 'https://api.testnet.solana.com'
// Your token address
const mintAddress = 'B8sHjn5bo6Xum82Zq2hq43DY979LGwZ86nUgGYi7FkiX'
// You can get the path from SOL cli using 'solana config get'
const keypairFile = '/root/.config/solana/id.json'

// Your Token Metadata
const name = 'GM'
const symbol = 'GM'
const uri = '' // your token image uri
```

Run intial
```
ts-node intial.ts
```

Check the new token on [solscan](https://solscan.io/token/B8sHjn5bo6Xum82Zq2hq43DY979LGwZ86nUgGYi7FkiX?cluster=testnet)


> Fork from [Link](https://github.com/mofrey-max/token-metadata-program)
