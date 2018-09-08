import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  count: 0
}
// Internally, store will fetch the last known state (if any) and pass that in as the first argument,
// and then store the resulting state in cache.
// This state can be observed in the view portion of your app.
// Also note that the store method returns an observable of states.
app.store(async (state, event) => {
  if (state === null) state = initialState

  switch (event.event) {
    case 'Increment':
      return { count: await getValue() }
    case 'Decrement':
      return { count: await getValue() }
    case 'RequestCreated':
      console.log('RequestCreated event emitted');
      console.log(event);

    case 'DummyRequestCreated':
      console.log('DummyRequestCreated event emitted');
      console.log(event);
    default:
      return state
  }
})

function getValue() {
  // Get current value from the contract by calling the public getter
  return new Promise(resolve => {
    app
      .call('value')
      .first()
      .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}
