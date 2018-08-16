pragma solidity ^0.4.24;

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
		address[] 	_payeesIdAddress,
		address[] 	_payeesPaymentAddress,
		int256[] 	_expectedAmounts,
		address 	_payer,
		address 	_payerRefundAddress,
		string 		_data)
		external
		payable
		returns(bytes32)
	{
		bytes32 requestId = requestEthereum.createRequestAsPayee(
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