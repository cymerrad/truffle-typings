import "./truffle-contract"

declare module 'truffle-contract' {

  function contract<T>(json: any): Truffle.Contract<T>;

  export = contract;
}
