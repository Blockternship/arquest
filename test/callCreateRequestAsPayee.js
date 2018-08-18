const InvoicingApp = artifacts.require('InvoicingApp');

async function execute() {
  const instance = await InvoicingApp.deployed();
  // console.log(instance);
  
  const _payeesPaymentAddress = ['0x627306090abaB3A6e1400e9345bC60c78a8BEf57'];
  const expectedAmount = web3.toWei('.012', 'ether');
  const payer = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
  const data = 'Invoice 1';

  const estimation = await instance.collectEstimation.call(expectedAmount);
  console.log('estimation', estimation);

  const callCreateRequestAsPayee = await instance.createRequestAsPayee
  (
    _payeesPaymentAddress,
    [expectedAmount],
    payer,
    payer, // _payerRefundAddress
    data,
    {
      from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      value: estimation,
      // gas: 90000000 - 1,
      // gasPrice: web3.toWei('20', 'gwei')
  });
  console.log('callCreateRequestAsPayee');
  console.dir(callCreateRequestAsPayee, {depth: null});

  // const requests = await instance.requests(1);
  // console.dir(requests, {depth: null});
}

module.exports = async function(callback) {
  // perform actions
  await execute();
  callback();
}