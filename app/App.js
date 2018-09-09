import React from 'react'
import {
  AragonApp,
  Button,
  AppBar,
  observe,
  SidePanel
} from '@aragon/ui'
import Invoices from './components/Invoices';
import NewPaymentRequest from './components/NewPaymentRequest';
// const AppContainer = styled(AragonApp)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newPaymentRequestOpened: false
    }
  }

  handleNewPaymentRequestOpen = () => {
    this.setState({ newPaymentRequestOpened: true })
  }

  handleNewPaymentRequestClose = () => {
    this.setState({ newPaymentRequestOpened: false })
  }

  render () {
    return (
      <AragonApp className="app" publicUrl={'/'}>
        <AppBar
          title="Invoices"
          endContent={
            <Button mode="strong" onClick={this.handleNewPaymentRequestOpen}>
              Create Payment Request
            </Button>
          }
        />
        <ObservedPayments observable={this.props.observable} />
        {/* <Invoices /> */}
        <SidePanel
          title="New Payment Request"
          opened={this.state.newPaymentRequestOpened}
          onClose={this.handleNewPaymentRequestClose}>
            <NewPaymentRequest app={this.props.app} tokens={[{symbol: 'ETH'}]}/>
        </SidePanel>
      </AragonApp>
    )
  }
}

const ObservedPayments = observe(
  (state$) => state$,
  { rows: [{
    id: '123',
    payer: '0xb8d851486d1c953e31a44374aca11151d49b8bb3',
    status: 'Pending',
    amount: '0.45 ETH'}] }
)(Invoices)
