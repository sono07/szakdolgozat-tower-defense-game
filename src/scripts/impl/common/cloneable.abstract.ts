import { ICloneable } from "../../api/common/cloneable.interface";

export abstract class BaseCloneable implements ICloneable {
    public abstract copy(obj: this): this;

    public clone(): this {
        const clone: this = Object.create(Object.getPrototypeOf(this));
        clone.copy(this);

        return clone;
    }
}