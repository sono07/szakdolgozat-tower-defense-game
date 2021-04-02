import { Phaser } from "../__helper__/phaser.export";

export interface IAction {
	actionKey: string;
	getPriceForTile(tile?: Phaser.Tilemaps.Tile): number;
	getSelectorColorForTile(tile?: Phaser.Tilemaps.Tile): number;
	onTileHover(tile?: Phaser.Tilemaps.Tile) : void;
	onTileClick(tile: Phaser.Tilemaps.Tile) : void;
}
