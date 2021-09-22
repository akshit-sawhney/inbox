const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const INITIAL_MESSAGE = 'Hi There';

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'inject scare river salon into try eternal mask box plate arrive better',
    'https://rinkeby.infura.io/v3/0fcf7f81157a42e8b8b2ab4e30b96949'
);

const web3 = new Web3(provider);

const deploy = async () => {
    // Get list of all the accounts
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: [INITIAL_MESSAGE]
    })
    .send({
        from: accounts[0],
        gas: '1000000',
        gasPrice: '5000000000'
    });
    console.log('Contract deployed to: ', result.options.address);
};
deploy();
