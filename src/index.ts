import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash:string;
  public data:string;
  public timestamp:number;

  static calculateBlockHash = (
    index: number,
    previousHash:string,
    timestamp:number,
    data:string,
  ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  constructor(
    index: number,
    hash: string,
    previousHash:string,
    data:string,
    timestamp:number
  ){
    this.index = index ;
    this.hash = hash ;
    this.previousHash = previousHash ;
    this.data = data ;
    this.timestamp = timestamp ;
  }
}

const genesisBlock:Block = new Block(0,"23232323232323","","Hello",123456);

let blockchain : Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;
const getLastestBlock = () : Block => blockchain[blockchain.length - 1];
const getNewtimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
  const previosBlock : Block = getLastestBlock();
  const newIndex : number = previosBlock.index + 1;
  const newTimestamp : number = getNewtimeStamp();
  const newHash : string = Block.calculateBlockHash(newIndex,previosBlock.hash, newTimestamp,data);
  const newBlock : Block = new Block(newIndex, newHash, previosBlock.hash, data, newTimestamp);
  return newBlock;
}


  export {};