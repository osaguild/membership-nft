/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface CheckerInterface extends utils.Interface {
  functions: {
    "checkAnswers(address)": FunctionFragment;
    "getCountOfQuestions()": FunctionFragment;
    "getQuestion(uint256)": FunctionFragment;
    "isAnswered(address)": FunctionFragment;
    "registAnswers(uint256[],bool[])": FunctionFragment;
    "setQuestion(string,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkAnswers"
      | "getCountOfQuestions"
      | "getQuestion"
      | "isAnswered"
      | "registAnswers"
      | "setQuestion"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkAnswers",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCountOfQuestions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getQuestion",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "isAnswered", values: [string]): string;
  encodeFunctionData(
    functionFragment: "registAnswers",
    values: [BigNumberish[], boolean[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setQuestion",
    values: [string, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkAnswers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCountOfQuestions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getQuestion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isAnswered", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registAnswers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setQuestion",
    data: BytesLike
  ): Result;

  events: {
    "AnswerAdded(address)": EventFragment;
    "QuestionAdded(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AnswerAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "QuestionAdded"): EventFragment;
}

export interface AnswerAddedEventObject {
  sender: string;
}
export type AnswerAddedEvent = TypedEvent<[string], AnswerAddedEventObject>;

export type AnswerAddedEventFilter = TypedEventFilter<AnswerAddedEvent>;

export interface QuestionAddedEventObject {
  sender: string;
  id: BigNumber;
}
export type QuestionAddedEvent = TypedEvent<
  [string, BigNumber],
  QuestionAddedEventObject
>;

export type QuestionAddedEventFilter = TypedEventFilter<QuestionAddedEvent>;

export interface Checker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CheckerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    checkAnswers(target: string, overrides?: CallOverrides): Promise<[boolean]>;

    getCountOfQuestions(overrides?: CallOverrides): Promise<[BigNumber]>;

    getQuestion(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    isAnswered(target: string, overrides?: CallOverrides): Promise<[boolean]>;

    registAnswers(
      ids: BigNumberish[],
      answers: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setQuestion(
      text: string,
      answer: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  checkAnswers(target: string, overrides?: CallOverrides): Promise<boolean>;

  getCountOfQuestions(overrides?: CallOverrides): Promise<BigNumber>;

  getQuestion(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  isAnswered(target: string, overrides?: CallOverrides): Promise<boolean>;

  registAnswers(
    ids: BigNumberish[],
    answers: boolean[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setQuestion(
    text: string,
    answer: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkAnswers(target: string, overrides?: CallOverrides): Promise<boolean>;

    getCountOfQuestions(overrides?: CallOverrides): Promise<BigNumber>;

    getQuestion(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    isAnswered(target: string, overrides?: CallOverrides): Promise<boolean>;

    registAnswers(
      ids: BigNumberish[],
      answers: boolean[],
      overrides?: CallOverrides
    ): Promise<void>;

    setQuestion(
      text: string,
      answer: boolean,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AnswerAdded(address)"(sender?: null): AnswerAddedEventFilter;
    AnswerAdded(sender?: null): AnswerAddedEventFilter;

    "QuestionAdded(address,uint256)"(
      sender?: null,
      id?: null
    ): QuestionAddedEventFilter;
    QuestionAdded(sender?: null, id?: null): QuestionAddedEventFilter;
  };

  estimateGas: {
    checkAnswers(target: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCountOfQuestions(overrides?: CallOverrides): Promise<BigNumber>;

    getQuestion(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAnswered(target: string, overrides?: CallOverrides): Promise<BigNumber>;

    registAnswers(
      ids: BigNumberish[],
      answers: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setQuestion(
      text: string,
      answer: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkAnswers(
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCountOfQuestions(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getQuestion(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAnswered(
      target: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registAnswers(
      ids: BigNumberish[],
      answers: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setQuestion(
      text: string,
      answer: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}