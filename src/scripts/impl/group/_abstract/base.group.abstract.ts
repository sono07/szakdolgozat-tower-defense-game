import { IGroup } from "../../../api/group/group.interface";

export abstract class BaseGroup<T extends Phaser.GameObjects.GameObject> extends Phaser.GameObjects.Group implements IGroup<T> {

    public children!: Phaser.Structs.Set<T>

    public createCallbackT!: (item: T) => void;
    /**
     * @deprecated use `createCallbackT` instead
     */
    public createCallback: (item: Phaser.GameObjects.GameObject) => void = (item) => {
        if(this.createCallbackT != null) {
            this.createCallbackT(item as T);
        }
    }

    public removeCallbackT!: (item: T) => void;
    /**
     * @deprecated use `removeCallbackT` instead
     */
    public removeCallback: (item: Phaser.GameObjects.GameObject) => void = (item) => {
        if(this.removeCallbackT != null) {
            this.removeCallbackT(item as T)
        }
    }
    
    public createMultipleCallbackT!: (items: T[]) => void;
    /**
     * @deprecated use `createMultipleCallbackT` instead
     */
    public createMultipleCallback: (items: Phaser.GameObjects.GameObject[]) => void = (items) => {
        if(this.createMultipleCallbackT != null) {
            this.createMultipleCallbackT(items as T[]);
        }
    }

    constructor(scene: Phaser.Scene, clazz: new (scene: Phaser.Scene) => T) {
        super(scene, {runChildUpdate: true, classType: clazz})

        scene.sys.updateList.add(this as any);
    }

    public destroy(destroyChildren?: boolean): void {
        if(this.scene != null) {
            this.scene.sys.updateList.remove(this as any)
        }

        return super.destroy(destroyChildren);
    }

    public create(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean, active?: boolean): T {
        return super.create(x,y,key, frame, visible, active);
    }

    public createMultiple(config: Phaser.Types.GameObjects.Group.GroupCreateConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig[]): T[] {
        return super.createMultiple(config);
    }

    public createFromConfig(options: Phaser.Types.GameObjects.Group.GroupCreateConfig): T[] {
        return super.createFromConfig(options);
    }

    public add(child: T, addToScene?: boolean): this {
        super.add(child, addToScene);
        return this;
    }

    public addMultiple(children: T[], addToScene?: boolean): this {
        super.addMultiple(children, addToScene);
        return this;
    }

    public remove(child: T, removeFromScene?: boolean, destroyChild?: boolean): this {
        super.remove(child, removeFromScene, destroyChild);
        return this;
    }

    public contains(child: T): boolean {
        return super.contains(child);
    }

    public getChildren(): T[] {
        return super.getChildren() as T[];
    }

    public getMatching(property?: string, value?: any, startIndex?: number, endIndex?: number): T[] {
        return super.getMatching(property, value,startIndex, endIndex);
    }

    public getFirst(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirst(state, createIfNull, x, y, key, frame, visible);
    }

    public getFirstNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstNth(nth, state, createIfNull, x, y, key, frame, visible);
    }

    public getLast(state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getLast(state, createIfNull, x, y, key, frame, visible);
    }

    public getLastNth(nth: number, state?: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getLastNth(nth, state, createIfNull, x, y, key, frame, visible);
    }

    public get(x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.get(x, y, key, frame, visible);
    }

    public getFirstAlive(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstAlive(createIfNull, x, y, key, frame, visible);
    }

    public getFirstDead(createIfNull?: boolean, x?: number, y?: number, key?: string, frame?: string | number, visible?: boolean): T {
        return super.getFirstDead(createIfNull, x, y, key, frame, visible);
    }

    public kill(gameObject: T): void {
        return super.kill(gameObject);
    }

    public killAndHide(gameObject: T): void {
        return super.killAndHide(gameObject);
    }
}
            