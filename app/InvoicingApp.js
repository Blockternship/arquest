import Aragon, { providers } from '@aragon/client'

class InvoicingApp {
  app = new Aragon(new providers.WindowMessage(window.parent));

  collectEstimation(etherAmount) {
    return new Promise((resolve, reject) => {
      console.log('web3.toWei(etherAmount)', web3.toWei(etherAmount, 'ether'))
      this.app
        .call('collectEstimation', web3.toWei(etherAmount, 'ether'))
        .first()
        // .map(value => parseInt(value, 10))
        .subscribe(resolve, reject)
    })
  }

  async createRequestAsPayee(amount, payer, data) {
    const fee = await this.collectEstimation(amount);
    console.log('fee', fee);
    this.app.createRequestAsPayee([amount], payer, data || '', {value: fee})
    // return new Promise((resolve, reject) => {
    //   this.app.createRequestAsPayee([amount], payer, data || '', {value: fee})
    //     .subscribe(resolve, reject)
    // })
  }
}

export default new InvoicingApp();