# Install

```
npm i @elevenyellow.com/wallets-helpers
```

# Types / Naming / Terms

### mnemonic `string`

Mnemonic are the words that are used to recover a wallet. Usually 12 or 24 words.

```
property bone kite yard announce enjoy legal load raven praise hurdle point
```

### seed `object`

A special object generated by [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) that allow us derive another seeds or export it in other formats.

### network `object`

Network is an object that determine what blockchain are you connecting with.

### private_key `string`

### address `string`

### extended_private_key `string`

Is the way to export a seed in string format. With this we can recover our seed at any time and derive or generate private keys and addresses.

### extended_public_key `string`

With this we can recover our seed at any time and generate multiple addresses. With the extended public key you can generate addresses but no private keys.

# API

### getCoin({ symbol }) : object

### getNetwork({ symbol, [name=mainnet] }) : network

```js
import { getNetwork } from '@elevenyellow.com/wallets-helpers'
const mainnet = getNetwork({symbol:'BTC'}) // Bitcoin.networks.bitcoin
const testnet =  = getNetwork({symbol:'BTC', name:'testnet'}) // Bitcoin.networks.testnet
```

### getDerivationPath({ symbol, [name=mainnet], [segwit=true] }) : string

## /BTC

### getRandomMnemonic({ [words] }) : mnemonic

Used to create a new random mnemonic.

#### Params

-   words:`number` _optional_ default=24

#### Returns

mnemonic:`string`

#### Example

```js
import { getRandomMnemonic } from '@elevenyellow.com/wallets-helpers/BTC'
const mnemonic = getRandomMnemonic({ words: 12 })
```

### getSeedFromMnemonic({ mnemonic, network, [passphase] }) : seed

It creates a seed from the mnemonic passed.

#### Params

-   mnemonic:`string`
-   network:`object`
-   passphase:`string` _optional_

#### Returns

seed:`object`

#### Example

```js
import {
    networks,
    getRandomMnemonic,
    getSeedFromMnemonic
} from '@elevenyellow.com/wallets-helpers/BTC'
const network = networks.mainnet
const mnemonic = getRandomMnemonic({ words: 12 })
const seed = getSeedFromMnemonic({ mnemonic, network })
```

### getPrivateKeyFromSeed({ seed }) : private_key

It gets a private key from a seed.

#### Params

-   seed:`object`

#### Returns

private_key:`string`

### getAddressFromSeed({ seed, network, [segwit] }) : address

It gets an address from a seed.

#### Params

-   seed:`object`
-   network:`object`
-   segwit:`boolean` _optional_ default=true

#### Returns

address:`string`

### getAddressFromPrivateKey({ private_key, network, [segwit] }) : address

It gets an address from a private key.

#### Params

-   private_key:`string`
-   network:`object`
-   segwit:`boolean` _optional_ default=true

#### Returns

address:`string`

### derivePath({ seed, path }) : seed

It creates a new seed with a new derivation.

#### Params

-   seed:`object`
-   path:`string`

#### Returns

seed:`object`

#### Example

```js
const seed = getSeedFromMnemonic({ mnemonic, network })
const seed_rerived = derivePath({ seed, path: "m/44'/0'/0'/0/25" })
const private_key = getPrivateKeyFromSeed({ seed: seed_rerived })
console.log(private_key) // 'L2PUoVDh2hpKzfRGcbuQW9NHssEBbX7gEuWobWhzmqan2iKVhtcL'
```

### deriveIndex({ seed, index }) : seed

It creates a new seed with a new derivation.

#### Params

-   seed:`object`
-   index:`number`

#### Returns

seed:`object`

#### Example

```js
let seed = getSeedFromMnemonic({ mnemonic, network })
seed = derivePath({ seed, path: "m/44'/0'/0'/0" })
seed = deriveIndex({ seed, index: 25 })
// Equivalent to
seed = derivePath({ seed, path: "m/44'/0'/0'/0/25" })
```

### getExtendedPrivateKeyFromSeed({ seed }) : extended_private_key

#### Params

-   seed:`object`

#### Returns

extended_private_key:`string`

#### Example

```js
const seed = getSeedFromMnemonic({ mnemonic, network })
const xprv = getExtendedPrivateKeyFromSeed({ seed })
const seed2 = getSeedFromExtended({ extended: xprv })
const prv1 = getPrivateKeyFromSeed({ seed })
const prv2 = getPrivateKeyFromSeed({ seed: seed2 })
prv1 === prv2 // true
```

### getExtendedPublicKeyFromSeed({ seed }) : extended_public_key

#### Params

-   seed:`object`

#### Returns

extended_public_key:`string`

#### Example

```js
const seed = getSeedFromMnemonic({ mnemonic, network })
const xpub = getExtendedPublicKeyFromSeed({ seed })
const seed2 = getSeedFromExtended({ extended: xpub })
const addres1 = getAddressFromSeed({ seed, network })
const addres2 = getAddressFromSeed({ seed: seed2, network })
addres1 === addres2 // true
```

### getSeedFromExtended({ extended }) : seed

#### Params

-   extended:`string` extended could be a extended_private_key or a extended_public_key

#### Returns

seed:`object`

#### Example

```js
const seed = getSeedFromMnemonic({ mnemonic, network })
const xprv = getExtendedPrivateKeyFromSeed({ seed })
const seed2 = getSeedFromExtended({ extended: xprv })
t.deepEqual(seed, seed2) // true
```

### isAddress(address) : boolean

Used to create a new random mnemonic.

#### Params

-   address:`string`

#### Returns

`boolean`
