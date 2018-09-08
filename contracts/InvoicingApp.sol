pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";
import {RequestEthereum} from "./requestNetwork/contracts/synchrone/RequestEthereum.sol";

contract InvoicingApp is AragonApp {
  enum State {Pending, Fulfilled}


  enum Status {Fulfilled, Pending}

  struct PaymentRequest {
    address payer;
    int256 amount;
    Status status;
    string data;
  }

  RequestEthereum public requestEthereum;
  address requestEthereumAddress;
  mapping(bytes32 => PaymentRequest) public requests;
  uint256 counter;

  event DummyRequestCreated(address _address, uint val);
  event RequestCreated(bytes32 indexed requestId, address payer, int256 amount, string data);

  function InvoicingApp(address _requestEthereum) public {
    requestEthereumAddress = _requestEthereum;
    requestEthereum = RequestEthereum(_requestEthereum);
  }

  function createRequestAsPayee(
		address[] 	_payeesPaymentAddress,
		int256[] 	_expectedAmounts,
		address 	_payer,
		string 		_data)
		public payable
		returns(bytes32 requestId)
	{
		// address[] memory _payeesIdAddress = new address[](1);
    // _payeesIdAddress[0] = address(this);
    // msg.value is the fee for creating the request
    // bytes32 requestId = requestEthereum.createRequestAsPayee.value(msg.value)(
    //   _payeesIdAddress,
    //   _payeesPaymentAddress, // make this the finance app address
    //   _expectedAmounts,
    //   _payer,
    //   _payer, // _payerRefundAddress,
    //   _data
    // );
    // requestId = keccak256(counter++);
    requestId = bytes32(counter++);
    PaymentRequest memory paymentRequest = PaymentRequest(
      _payer, _expectedAmounts[0], Status.Pending, _data);
    requests[requestId] = paymentRequest;
    emit RequestCreated(requestId, _payer, _expectedAmounts[0], _data);
	}

  function dummyCreateRequestAsPayee() {
    DummyRequestCreated(requestEthereumAddress, 5);
  }

  function collectEstimation(int256 _expectedAmount)
    public
    view
    returns(uint256)
  {
    return requestEthereum.collectEstimation(_expectedAmount);
  }
}