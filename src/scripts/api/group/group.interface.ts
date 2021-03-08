export interface IGroup<T extends Phaser.GameObjects.GameObject> extends Phaser.Physics.Arcade.Group {
    children: Phaser.Structs.Set<T>;
    createCallbackT: (item: T) => void;
    removeCallbackT: (item: T) => void;
    createMultipleCallbackT: (items: T[]) => void;

    destroy(destroyChildren?: boolean): void;
    createCallbackHandler(child: T): void;
    removeCallbackHandler(child: T): void;
    setVelocity(x: number, y: number, step?: number): this;
    setVelocityX(value: number, step?: number): this;
    setVelocityY(value: number, step?: number): this;
    create(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean, active?: boolean): T;
    createMultiple(config: Phaser.Types.GameObjects.Group.GroupCreateConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig[]): T[];
    createFromConfig(options: Phaser.Types.GameObjects.Group.GroupCreateConfig): T[];
    add(child: T, addToScene?: boolean): this;
    addMultiple(children: T[], addToScene?: boolean): this;
    remove(child: T, removeFromScene?: boolean, destroyChild?: boolean): this;
    contains(child: T): boolean;
    getChildren(): T[];
    getMatching(property?: string, value?: any, startIndex?: number, endIndex?: number): T[];
    getFirst(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    getFirstNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    getLast(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    getLastNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    get(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    getFirstAlive(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    getFirstDead(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T;
    kill(gameObject: T): void;
    killAndHide(gameObject: T): void;
}
            