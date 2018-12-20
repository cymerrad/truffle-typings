import "./truffle-contract"

declare module 'truffle-contract' {

  function contract<T>(json: Object): Truffle.Contract<T>;

  export = contract;
}
