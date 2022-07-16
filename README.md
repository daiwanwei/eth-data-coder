# eth-data-coder

## Description

**command line for decode/encode function signature,input data and event log**

## Commands

- [x] abi
    - [x] getFunctionSighash
- [x] decode
    - [x] decodeData
    - [ ] decodeLog
- [x] erc20
  - [x] decodeData
  - [x] getFunctionSighash

## How To Run This Project

### Installation

```shell
yarn install
```

### Run

```shell
#get info of command 
$ yarn start:cli {command} --help  
#get function sighash  
$ yarn start:cli abi getFunctionSighash --abiPath={YOUR_ABI_PATH}  
#get decoded data  
$ yarn start:cli decode decodeData {INPUT_DATA} --abiPath={YOUR_ABI_PATH}  
```

### Test

```shell
yarn test
```
