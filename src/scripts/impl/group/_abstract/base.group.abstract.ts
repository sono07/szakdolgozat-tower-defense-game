import { IGroup } from "../../../api/group/group.interface";

export abstract class BaseGroup<T extends Phaser.GameObjects.GameObject> extends Phaser.GameObjects.Group implements IGroup<T> {

    children!: Phaser.Structs.Set<T>

    createCallbackT!: (item: T) => void;
    /**
     * @deprecated use `createCallbackT` instead
     */
    createCallback: (item: Phaser.GameObjects.GameObject) => void = (item) => {
        if(this.createCallbackT != null) {
            this.createCallbackT(item as T);
        }
    }

    removeCallbackT!: (item: T) => void;
    /**
     * @deprecated use `removeCallbackT` instead
     */
    removeCallback: (item: Phaser.GameObjects.GameObject) => void = (item) => {
        if(this.removeCallbackT != null) {
            this.removeCallbackT(item as T)
        }
    }
    
    createMultipleCallbackT!: (items: T[]) => void;
    /**
     * @deprecated use `createMultipleCallbackT` instead
     */
    createMultipleCallback: (items: Phaser.GameObjects.GameObject[]) => void = (items) => {
        if(this.createMultipleCallbackT != null) {
            this.createMultipleCallbackT(items as T[]);
        }
    }

    constructor(scene: Phaser.Scene, clazz: new (scene: Phaser.Scene) => T) {
        super(scene, {runChildUpdate: true, classType: clazz})

        scene.sys.updateList.add(this as any);
    }

    destroy(destroyChildren?: boolean): void {
        if(this.scene != null) {
            this.scene.sys.updateList.remove(this as any)
        }

        return super.destroy(destroyChildren);
    }

    create(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean, active?: boolean): T {
        return super.create(x,y,key, frame, visible, active);
    }

    createMultiple(config: Phaser.Types.GameObjects.Group.GroupCreateConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig[]): T[] {
        return super.createMultiple(config);
    }

    createFromConfig(options: Phaser.Types.GameObjects.Group.GroupCreateConfig): T[] {
        return super.createFromConfig(options);
    }

    add(child: T, addToScene?: boolean): this {
        super.add(child, addToScene);
        return this;
    }

    addMultiple(children: T[], addToScene?: boolean): this {
        super.addMultiple(children, addToScene);
        return this;
    }

    remove(child: T, removeFromScene?: boolean, destroyChild?: boolean): this {
        super.remove(child, removeFromScene, destroyChild);
        return this;
    }

    contains(child: T): boolean {
        return super.contains(child);
    }

    getChildren(): T[] {
        return super.getChildren() as T[];
    }

    getMatching(property?: string, value?: any, startIndex?: number, endIndex?: number): T[] {
        return super.getMatching(property, value,startIndex, endIndex);
    }

    getFirst(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirst(state, createIfNull, x, y, key, frame, visible);
    }

    getFirstNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstNth(nth, state, createIfNull, x, y, key, frame, visible);
    }

    getLast(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getLast(state, createIfNull, x, y, key, frame, visible);
    }

    getLastNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getLastNth(nth, state, createIfNull, x, y, key, frame, visible);
    }

    get(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.get(x, y, key, frame, visible);
    }

    getFirstAlive(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstAlive(createIfNull, x, y, key, frame, visible);
    }

    getFirstDead(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstDead(createIfNull, x, y, key, frame, visible);
    }

    kill(gameObject: T): void {
        return super.kill(gameObject);
    }

    killAndHide(gameObject: T): void {
        return super.killAndHide(gameObject);
    }
}
            