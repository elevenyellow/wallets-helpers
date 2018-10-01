const Bitcoin = require('bitcoinjs-lib')
const { toSmallUnit, toBigUnit, limitDecimals } = require('../')

const decimals = 8
const networks = [
    {
        name: 'mainnet',
        config: Bitcoin.networks.bitcoin,
        path: {
            false: `m/44'/0'`,
            true: `m/49'/0'` // segwit true
        }
    },
    {
        name: 'testnet',
        config: Bitcoin.networks.testnet,
        path: {
            false: `m/44'/1'`,
            true: `m/49'/1'` // segwit true
        }
    }
]

function getPrivateKeyFromSeed({ seed }) {
    const keypair = seed.keyPair
    return keypair.toWIF().toString()
}

function getAddressFromSeed({ seed, network, segwit = true }) {
    const keypair = seed.keyPair
    return getAddressFromKeypair({ keypair, network, segwit })
}

function getAddressFromPrivateKey({ private_key, network, segwit }) {
    const keypair = Bitcoin.ECPair.fromWIF(private_key, network)
    return getAddressFromKeypair({ keypair, network, segwit })
}

function getAddressFromKeypair({ keypair, network, segwit = true }) {
    if (!segwit) {
        return keypair.getAddress().toString()
    } else {
        const pub_key = keypair.getPublicKeyBuffer()
        const pub_key_hash = Bitcoin.crypto.hash160(pub_key)
        const redeem_script = Bitcoin.script.witnessPubKeyHash.output.encode(
            pub_key_hash
        )
        const redeem_script_hash = Bitcoin.crypto.hash160(redeem_script)
        const script_pub_key = Bitcoin.script.scriptHash.output.encode(
            redeem_script_hash
        )
        return Bitcoin.address.fromOutputScript(script_pub_key, network)
    }
}

function isAddress(address) {
    return (
        validateAddress({ address, network: networks[0].config }) ||
        validateAddress({ address, network: networks[1].config })
    )
}

function validateAddress({ address, network, segwit }) {
    try {
        const { version } = Bitcoin.address.fromBase58Check(address)
        if (segwit === true) {
            return version === network.scriptHash
        }
        if (segwit === false) {
            return version === network.pubKeyHash
        }
        return version === network.pubKeyHash || version === network.scriptHash
    } catch (e) {
        return false
    }
}

function toSatoshis(value) {
    return limitDecimals(toBigUnit(value, decimals), decimals)
}

function fromSatoshis(value) {
    return limitDecimals(toSmallUnit(value, decimals), decimals)
}

module.exports = {
    decimals,
    networks,
    getPrivateKeyFromSeed,
    getAddressFromSeed,
    getAddressFromPrivateKey,
    isAddress,
    validateAddress,
    toSatoshis,
    fromSatoshis
}
