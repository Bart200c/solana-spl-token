import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';


// ========================== On-demand modifications 
const endpoint = 'https://api.testnet.solana.com'
const mintAddress = 'B8sHjn5bo6Xum82Zq2hq43DY979LGwZ86nUgGYi7FkiX'
const keypairFile = '/root/.config/solana/id.json'
const name = ''
const symbol = ''
const uri = ''
// ========================== 

export function loadWalletKey(keypairFile: string): web3.Keypair {
    const fs = require("fs");
    const loaded = web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}

async function main() {

    console.log("AGXT TOKEN NAME AND LOGO")
    const myKeypair = loadWalletKey(keypairFile);
    console.log(myKeypair.publicKey.toBase58());
    const mint = new web3.PublicKey(mintAddress);
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode('metadata'));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());

    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);

    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }
    const dataV2 = {
        name: name,
        symbol: symbol,
        uri: uri,
        // we don't need that
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }
    const args = {
        createMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true
        }
    };
    const ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection(endpoint);
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);
}

main()
