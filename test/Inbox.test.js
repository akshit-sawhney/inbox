const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

const INITIAL_MESSAGE = 'Hi There';
const CHANGED_MESSAGE = 'Bye';

let fetchedAccounts;
let inbox;
beforeEach(async () => {
    // Get a list of all the accounts
    fetchedAccounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: [INITIAL_MESSAGE]
    })
    .send({
        from: fetchedAccounts[0],
        gas: '1000000'
    });
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(INITIAL_MESSAGE, message);
    });

    it('can change the initial message', async () => {
        const setMessageResponse = await inbox.methods.setMessage(CHANGED_MESSAGE)
        .send({
            from: fetchedAccounts[0]
        });
        const message = await inbox.methods.message().call();
        assert.equal(CHANGED_MESSAGE, message);
    });
})
