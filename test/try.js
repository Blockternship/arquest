const InvoicingApp = artifacts.require('InvoicingApp');

async function execute() {
  const instance = await InvoicingApp.deployed();
  // console.log(instance);
  const estimation = await instance.collectEstimation.call(678000);
  console.log(estimation);
}

module.exports = async function(callback) {
  // perform actions
  await execute();
  callback();
}