export interface IScene {
    init(data: object): void;
    preload(): void;
    create(data: object): void;
    update(time: number, delta: number): void;
}