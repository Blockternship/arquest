const InvoicingApp = artifacts.require('InvoicingApp');
const RequestEthereum = artifacts.require('RequestEthereum');

const RequestCore = artifacts.require('RequestCore');
const abiDecoder = require('abi-decoder');

async function execute() {
  const instance = await InvoicingApp.deployed();
  const expectedAmount = web3.toWei('.012', 'ether');

  const from = '0xb4124ceb3451635dacedd11767f004d8a28c6ee7';
  const payer = '0x306469457266CBBe7c0505e8Aad358622235e768';
  const data = 'Invoice 1';

  // get fees estimation
  const estimation = await instance.collectEstimation.call(expectedAmount);
  console.log('estimation', estimation);

  const createRequestAsPayee = await instance.createRequestAsPayee(
    [expectedAmount],
    payer,
    data,
    {
      from, // account used to deploy
      value: estimation,
      // gas: 90000000 - 1,
      // gasPrice: web3.toWei('20', 'gwei')
    }
  );
  console.log('createRequestAsPayee tx receipt');
  console.dir(createRequestAsPayee, {depth: null});

  // add RequestCore abi to decode Created event
  abiDecoder.addABI(RequestCore.abi);
  abiDecoder.addABI(InvoicingApp.abi);
  const receipt = createRequestAsPayee.receipt;
  const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
  console.dir(decodedLogs, {depth: null});
  // [ { name: 'Created',
  // events:
  //  [ { name: 'requestId',
  //      type: 'bytes32',
  //      value: '0xdafa7c2690a61ef657584702a48bffb002fcd641000000000000000000000007' },
  //    { name: 'payee',
  //      type: 'address',
  //      value: '0x21722dc5d78334babaa19a0fca5210bd453eaa57' },
  //    { name: 'payer',
  //      type: 'address',
  //      value: '0xf17f52151ebef6c7334fad080c5704d77216b732' },
  //    { name: 'creator',
  //      type: 'address',
  //      value: '0x21722dc5d78334babaa19a0fca5210bd453eaa57' },
  //    { name: 'data', type: 'string', value: 'Invoice 1' } ],
  // address: '0xdafa7c2690a61ef657584702a48bffb002fcd641' } ]

  // const requests = await instance.requests(1);
  // console.dir(requests, {depth: null});
  const _payment = await paymentAction(decodedLogs[0].events[0].value, expectedAmount, payer);
  console.dir(_payment, {depth: null});
}

module.exports = async function(callback) {
  // perform actions
  await execute();
  // await paymentAction(
  //   '0xa523bb521e8f5847ac2e4cafd5d98242cdf48c60000000000000000000000001',
  //   web3.toWei('0.33', 'ether'),
  //   '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb'
  // );
  callback();
}


async function paymentAction(requestID, amount, payer) {
  const instance = await RequestEthereum.deployed();
  abiDecoder.addABI(RequestEthereum.abi);
  const _paymentAction = await instance.paymentAction(
    requestID,
    [amount],
    [],
    {
      from: payer,
      value: amount,
      // gas: 90000000 - 1,
      // gasPrice: web3.toWei('20', 'gwei')
    }
  );
  // console.log('paymentAction estimation', estimation);
  const receipt = _paymentAction.receipt;
  const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
  console.log('in _paymentAction')
  console.dir(decodedLogs, {depth: null});
}

// module.exports = async function(callback) {
//   // perform actions
//   await execute();
//   callback();
// }