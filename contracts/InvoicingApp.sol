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
  address public requestEthereumAddress;
  mapping(bytes32 => PaymentRequest) public requests;
  uint256 counter;

  event DummyRequestCreated(address _address, uint val);
  event RequestCreated(bytes32 indexed requestId, address payer, int256 amount, string data);

  function InvoicingApp() public {
    // address _requestEthereum = 0x497d9c622bc27efd06d2632021fdc3cc5038e420;
    // requestEthereumAddress = _requestEthereum;
    // requestEthereum = RequestEthereum(_requestEthereum);
  }

  function initialize() external onlyInit {
    initialized();
    requestEthereumAddress = 0x497d9c622bc27efd06d2632021fdc3cc5038e420;
    requestEthereum = RequestEthereum(requestEthereumAddress);
  }

  function createRequestAsPayee(
		address[] 	_payeesPaymentAddress,
		int256[] 	_expectedAmounts,
		address 	_payer,
		string 		_data)
		public payable
		returns(bytes32 requestId)
	{
		address[] memory _payeesIdAddress = new address[](1);
    _payeesIdAddress[0] = address(this);
    // msg.value is the fee for creating the request
    bytes32 requestId = requestEthereum.createRequestAsPayee.value(msg.value)(
      _payeesIdAddress,
      _payeesPaymentAddress, // make this the finance app address
      _expectedAmounts,
      _payer,
      _payer, // _payerRefundAddress,
      _data
    );
    requestId = keccak256(counter++);
    // requestId = bytes32(counter++);
    // PaymentRequest memory paymentRequest = PaymentRequest(
    //   _payer, _expectedAmounts[0], Status.Pending, _data);
    // requests[requestId] = paymentRequest;
    emit RequestCreated(requestId, _payer, _expectedAmounts[0], _data);
	}

  function dummyCreateRequestAsPayee() {
    DummyRequestCreated(requestEthereumAddress, 5);
  }

  function collectEstimation(int256 _expectedAmount)
    public
    view
    returns(uint256 fee)
  { 
    fee = requestEthereum.collectEstimation(_expectedAmount);
  }
}