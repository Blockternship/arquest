# ArQuest
Create smart invoices for your Decentralized Autonomous Organization (DAO). Building on [Aragon](https://aragon.org/) and [Request Network](https://request.network/#/).


1. [Proposal](https://github.com/Blockternship/projects/issues/11)
2. [PoC Demo Video](https://www.youtube.com/watch?v=E0p5Bjhkb30&feature=youtu.be)

### Development
```shell
ganache-cli -l 90000000 -p 8545 \
-m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

truffle compile
truffle migrate --reset
truffle exec test/callCreateRequestAsPayee.js
```
