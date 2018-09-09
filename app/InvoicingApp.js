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
}

export default new InvoicingApp();