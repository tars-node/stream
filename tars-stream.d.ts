// Type defined by feihua

export class TarsException extends Error {
  code: number
  constructor (code: number, message: string)
}

export class TarsEncodeException extends TarsException {
  code: -2
  constructor (message: string)
}

export class TarsDecodeException extends TarsException {
  code: -1
  constructor (message: string)
}

export class TarsDecodeMismatch extends TarsException {
  code: -1
  constructor (message: string)
}

export class TarsDecodeRequireNotExist extends TarsException {
  code: -1
  constructor (message: string)
}

export class TarsDecodeInvalidValue extends TarsException {
  code: -1
  constructor (message: string)
}

export class TupNotFoundKey extends TarsException {
  code: -1
  constructor (message: string)
}

export enum DataHelp {
  EN_INT8 = 0,
  EN_INT16 = 1,
  EN_INT32 = 2,
  EN_INT64 = 3,
  EN_FLOAT = 4,
  EN_DOUBLE = 5,
  EN_STRING1 = 6,
  EN_STRING4 = 7,
  EN_MAP = 8,
  EN_LIST = 9,
  EN_STRUCTBEGIN = 10,
  EN_STRUCTEND = 11,
  EN_ZERO = 12,
  EN_SIMPLELIST = 13
}

export type ConstructorOf<T> = new (...args: any[]) => T
export type Falsy = 0 | false
export type Truthy = 1 | true

export const Boolean: ConstructorOf<boolean>
export const Int8: ConstructorOf<number>
export const Int16: ConstructorOf<number>
export const Int32: ConstructorOf<number>
export const Int64: ConstructorOf<number>
export const UInt8: ConstructorOf<number>
export const UInt16: ConstructorOf<number>
export const UInt32: ConstructorOf<number>
export const Float: ConstructorOf<number>
export const Double: ConstructorOf<number>
export const String: ConstructorOf<string>
export const Enum: ConstructorOf<number>

export interface TarsClass<T = any> {
  toObject (): T;
  readFromObject (json: T): void
}

export type ToObject<T> = (
  T extends boolean | number | string | Buffer ? T :
  T extends TarsClass<infer U> ? U :
  never
)

export interface HeroList<T> extends TarsClass<ToObject<T> extends never ? never : ToObject<T>[]> {
  readonly value: T[]
  readonly length: number

  new (): this
  at (index: number): T
  push (value: T): void
  forEach (callback: (value: T, index: number, array: T[]) => boolean | void): void
}

export interface MultiMap<Key, Value> extends TarsClass<never> {
  readonly keys: any
  readonly value: any

  put (key: Key, value: Value): void
  set (key: Key, value: Value): void
  remove (key: Key): void
  size (): number
  has (key: Key): boolean
  insert (key: Key, value: Value): void
  get (key: Key): Value
  clear (): void
  forEach (callback: (key: Key, value: Value) => boolean | void): void
}

export interface HeroMap<Key, Value> extends TarsClass<ToObject<Value> extends never ? never : Record<string, ToObject<Value>>> {
  readonly value: Record<string, Value>

  new (): this
  put (key: Key, value: Value): void
  set (key: Key, value: Value): void
  remove (key: Key): void
  size (): number
  has (key: Key): boolean
  insert (key: Key, value: Value): void
  get (key: Key): Value
  clear (): void
  forEach (callback: (key: Key, value: Value) => boolean | void): void
}

export type List<T> = HeroList<T>
export const List: {
  <T>(proto: ConstructorOf<T>): ConstructorOf<HeroList<T>>
  (proto: typeof String, bValue: Truthy): ConstructorOf<HeroList<Buffer>>
  (proto: typeof Int64, bValue: Truthy): ConstructorOf<HeroList<string>>
  new <T>(proto: ConstructorOf<T>): HeroList<T>
  new (proto: typeof String, bValue: Truthy): HeroList<Buffer>
  new (proto: typeof Int64, bValue: Truthy): HeroList<string>
}

export type Map<Key, Value> = (
  Key extends string | number | Buffer
    ? HeroMap<Key, Value>
    : MultiMap<Key, Value>
)

export const Map: {
  <Key, Value>(kproto: ConstructorOf<Key>, vproto: ConstructorOf<Value>): ConstructorOf<Map<Key, Value>>
  <Value>(kproto: typeof String, vproto: ConstructorOf<Value>, bKey: Truthy): ConstructorOf<Map<Buffer, Value>>
  <Value>(kproto: typeof Int64, vproto: ConstructorOf<Value>, bKey: Truthy): ConstructorOf<Map<string, Value>>
  <Key>(kproto: ConstructorOf<Key>, vproto: typeof String, bKey: Falsy, bValue: Truthy): ConstructorOf<Map<Key, Buffer>>
  <Key>(kproto: ConstructorOf<Key>, vproto: typeof Int64, bKey: Falsy, bValue: Truthy): ConstructorOf<Map<Key, string>>
  (kproto: typeof String, vproto: typeof String, bKey: Truthy, bValue: Truthy): ConstructorOf<Map<Buffer, Buffer>>
  (kproto: typeof String, vproto: typeof Int64, bKey: Truthy, bValue: Truthy): ConstructorOf<Map<Buffer, string>>
  (kproto: typeof Int64, vproto: typeof String, bKey: Truthy, bValue: Truthy): ConstructorOf<Map<string, Buffer>>
  (kproto: typeof Int64, vproto: typeof Int64, bKey: Truthy, bValue: Truthy): ConstructorOf<Map<string, string>>

  new <Key, Value>(kproto: ConstructorOf<Key>, vproto: ConstructorOf<Value>): Map<Key, Value>
  new <Value>(kproto: typeof String, vproto: ConstructorOf<Value>, bKey: Truthy): Map<Buffer, Value>
  new <Value>(kproto: typeof Int64, vproto: ConstructorOf<Value>, bKey: Truthy): Map<string, Value>
  new <Key>(kproto: ConstructorOf<Key>, vproto: typeof String, bKey: Falsy, bValue: Truthy): Map<Key, Buffer>
  new <Key>(kproto: ConstructorOf<Key>, vproto: typeof Int64, bKey: Falsy, bValue: Truthy): Map<Key, string>
  new (kproto: typeof String, vproto: typeof String, bKey: Truthy, bValue: Truthy): Map<Buffer, Buffer>
  new (kproto: typeof String, vproto: typeof Int64, bKey: Truthy, bValue: Truthy): Map<Buffer, string>
  new (kproto: typeof Int64, vproto: typeof String, bKey: Truthy, bValue: Truthy): Map<string, Buffer>
  new (kproto: typeof Int64, vproto: typeof Int64, bKey: Truthy, bValue: Truthy): Map<string, string>
}

export class BinBuffer implements TarsClass<Buffer> {
  constructor (buffer?: Buffer)

  readonly length: number
  readonly capacity: number
  position: number

  static new (): BinBuffer
  static from (data: string): BinBuffer

  reset (): void
  replace (srcBuffer: Buffer, offset: number, byteLength: number): void
  print (): void

  writeInt8 (value: number): void
  writeUInt8 (value: number): void
  writeInt16 (value: number): void
  writeUInt16 (value: number): void
  writeInt32 (value: number): void
  writeUInt32 (value: number): void
  writeInt64  (value: number, bString?: Falsy): void
  writeInt64  (value: string, bString: Truthy): void
  writeFloat (value: number): void
  writeDouble (value: number): void
  writeString (value: string, byteLength?: number, bRaw?: Falsy): void
  writeString (value: Buffer, byteLength: number | undefined, bRaw: Truthy): void
  writeBinBuffer (srcBinBuffer: BinBuffer): void
  writeNodeBuffer (srcBuffer: Buffer, offset?: number, byteLength?: number): void

  readInt8 (): number
  readInt16 (): number
  readInt32 (): number
  readUInt8 (): number
  readUInt16 (): number
  readUInt32 (): number
  readInt64 (bString?: Falsy): number
  readInt64 (bString: Truthy): string
  readFloat (): number
  readDouble (): number
  readString (byteLength: number, bRaw?: Falsy): string
  readString (byteLength: number, bRaw: Truthy): Buffer
  readBinBuffer (byteLength: number, bReuse?: boolean): BinBuffer
  readFromObject (srcBuffer: Buffer): void

  toNodeBuffer (): Buffer
  toNodeBufferUnSafe (): Buffer
  toObject (): Buffer
}

export class TarsOutputStream {
  setHeaderLength (value: number): void
  writeBoolean (tag: number, value: boolean): void
  writeInt8 (tag: number, value: number): void
  writeInt16 (tag: number, value: number): void
  writeInt32 (tag: number, value: number): void
  writeInt64 (tag: number, value: number, bString?: Falsy): void
  writeInt64 (tag: number, value: string, bString: Truthy): void
  writeUInt8 (tag: number, value: number): void
  writeUInt16 (tag: number, value: number): void
  writeUInt32 (tag: number, value: number): void
  writeFloat (tag: number, value: number): void
  writeDouble (tag: number, value: number): void
  writeStruct (tag: number, value: any): void
  writeString (tag: number, value: string, bRaw?: Falsy): void
  writeString (tag: number, value: Buffer, bRaw: Truthy): void
  writeBytes (tag: number, value: BinBuffer): void
  writeList (tag: number, value: List<any>): void
  writeMap  (tag: number, value: Map<any, any>): void
  getBinBuffer (): BinBuffer
}

export class TarsInputStream {
  constructor (binBuffer: BinBuffer)
  setBinBuffer (binBuffer: BinBuffer): void
  readBoolean (tag: number, require: boolean, DEFAULT_VALUE?: boolean): boolean
  readInt8 (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readInt16 (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readInt32 (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readInt64 (tag: number, require: boolean, DEFAULT_VALUE?: number, bString?: Falsy): number
  readInt64 (tag: number, require: boolean, DEFAULT_VALUE: string | undefined, bString: Truthy): string
  readFloat (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readDouble (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readUInt8 (tag: number, require: boolean, DEFAULT_VALUE?: number) : number
  readUInt16 (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readUInt32 (tag: number, require: boolean, DEFAULT_VALUE?: number): number
  readString (tag: number, require: boolean, DEFAULT_VALUE?: string, bRaw?: Falsy): string
  readString (tag: number, require: boolean, DEFAULT_VALUE: Buffer | undefined, bRaw: Truthy): Buffer
  readStruct<T> (tag: number, require: boolean, TYPE_T: ConstructorOf<T>): T
  readBytes (tag: number, require: boolean, TYPE_T: ConstructorOf<any>, bRaw?: boolean): BinBuffer
  readList<T> (tag: number, require: boolean, TYPE_T: ConstructorOf<T>): T
  readMap<T> (tag: number, require: boolean, TYPE_T: ConstructorOf<T>): T
}

export class UniAttribute {
  static TUP_COMPLEX: 2
  static TUP_SIMPLE: 3

  tupVersion: number

  decode (binBuffer: BinBuffer): void
  encode (): BinBuffer

  writeBoolean (name: string, value: boolean): void
  writeInt8 (name: string, value: number): void
  writeInt16 (name: string, value: number): void
  writeInt32 (name: string, value: number): void
  writeInt64 (name: string, value: number, bString?: Falsy): void
  writeInt64 (name: string, value: string, bString: Truthy): void
  writeUInt8 (name: string, value: number): void
  writeUInt16 (name: string, value: number): void
  writeUInt32 (name: string, value: number): void
  writeFloat (name: string, value: number): void
  writeDouble (name: string, value: number): void
  writeBytes (name: string, value: BinBuffer): void
  writeString (name: string, value: string, bValue?: Falsy): void
  writeString (name: string, value: Buffer, bValue: Truthy): void
  writeStruct (name: string, value: any): void
  writeList (name: string, value: List<any>): void
  writeMap  (name: string, value: Map<any, any>): void

  readBoolean (name: string, DEFAULT_VALUE?: boolean): boolean
  readInt8 (name: string, DEFAULT_VALUE?: number): number
  readInt16 (name: string, DEFAULT_VALUE?: number): number
  readInt32 (name: string, DEFAULT_VALUE?: number): number
  readInt64 (name: string, DEFAULT_VALUE?: number, bString?: Falsy): number
  readInt64 (name: string, DEFAULT_VALUE: string | undefined, bString: Truthy): string
  readUInt8 (name: string, DEFAULT_VALUE?: number) : number
  readUInt16 (name: string, DEFAULT_VALUE?: number): number
  readUInt32 (name: string, DEFAULT_VALUE?: number): number
  readFloat (name: string, DEFAULT_VALUE?: number): number
  readDouble (name: string, DEFAULT_VALUE?: number): number
  readBytes (name: string, DEFAULT_VALUE?: BinBuffer): BinBuffer
  readString (name: string, DEFAULT_VALUE?: string, bValue?: Falsy): string
  readString (name: string, DEFAULT_VALUE: Buffer | undefined, bValue: Truthy): Buffer
  readStruct<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
  readList<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
  readMap<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
}

export class Tup {
  static TUP_COMPLEX: 2
  static TUP_SIMPLE: 3
  static JSON_VERSION: 5

  servantName: string
  funcName: string
  requestId: number
  tupVersion: number

  decode (binBuffer: BinBuffer): void
  encode (): BinBuffer

  getTarsResultCode (): number
  getTarsResultDesc (): string

  writeBoolean (name: string, value: boolean): void
  writeInt8 (name: string, value: number): void
  writeInt16 (name: string, value: number): void
  writeInt32 (name: string, value: number): void
  writeInt64 (name: string, value: number, bString?: Falsy): void
  writeInt64 (name: string, value: string, bString: Truthy): void
  writeUInt8 (name: string, value: number): void
  writeUInt16 (name: string, value: number): void
  writeUInt32 (name: string, value: number): void
  writeFloat (name: string, value: number): void
  writeDouble (name: string, value: number): void
  writeBytes (name: string, value: BinBuffer): void
  writeString (name: string, value: string, bValue?: Falsy): void
  writeString (name: string, value: Buffer, bValue: Truthy): void
  writeStruct (name: string, value: any): void
  writeList (name: string, value: List<any>): void
  writeMap  (name: string, value: Map<any, any>): void

  readBoolean (name: string, DEFAULT_VALUE?: boolean): boolean
  readInt8 (name: string, DEFAULT_VALUE?: number): number
  readInt16 (name: string, DEFAULT_VALUE?: number): number
  readInt32 (name: string, DEFAULT_VALUE?: number): number
  readInt64 (name: string, DEFAULT_VALUE?: number, bString?: Falsy): number
  readInt64 (name: string, DEFAULT_VALUE: string | undefined, bString: Truthy): string
  readUInt8 (name: string, DEFAULT_VALUE?: number) : number
  readUInt16 (name: string, DEFAULT_VALUE?: number): number
  readUInt32 (name: string, DEFAULT_VALUE?: number): number
  readFloat (name: string, DEFAULT_VALUE?: number): number
  readDouble (name: string, DEFAULT_VALUE?: number): number
  readBytes (name: string, DEFAULT_VALUE?: BinBuffer): BinBuffer
  readString (name: string, DEFAULT_VALUE?: string, bValue?: Falsy): string
  readString (name: string, DEFAULT_VALUE: Buffer | undefined, bValue: Truthy): Buffer
  readStruct<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
  readList<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
  readMap<T> (name: string, TYPE_T: ConstructorOf<T>, DEFAULT_VALUE?: T): T
}