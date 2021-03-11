export interface ICloneable {
    copy(obj: this): this;
    clone(): this;
}
