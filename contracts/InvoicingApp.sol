pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";
import {RequestEthereum} from "./requestNetwork/contracts/synchrone/RequestEthereum.sol";

contract InvoicingApp is AragonApp {
  enum State {Pending, Fulfilled}

  RequestEthereum public requestEthereum;
  bytes32[] public requests;

  function InvoicingApp(address _requestEthereum) public {
    requestEthereum = RequestEthereum(_requestEthereum);
  }

  function createRequestAsPayee(
		address[] 	_payeesPaymentAddress,
		int256[] 	_expectedAmounts,
		address 	_payer,
		address 	_payerRefundAddress,
		string 		_data)
		public
		payable
		returns(bytes32)
	{
		address[] memory _payeesIdAddress = new address[](1);
    _payeesIdAddress[0] = address(this);
    bytes32 requestId = requestEthereum.createRequestAsPayee.value(msg.value)(
      _payeesIdAddress,
      _payeesPaymentAddress,
      _expectedAmounts,
      _payer,
      _payerRefundAddress,
      _data
    );
    requests.push(requestId);
    return requestId;
	}

  function collectEstimation(int256 _expectedAmount)
    public
    view
    returns(uint256)
  {
    return requestEthereum.collectEstimation(_expectedAmount);
  }
}