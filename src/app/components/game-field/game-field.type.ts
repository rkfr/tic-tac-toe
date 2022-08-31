import {GameSign} from "../../constants";

export type GameItemCoords = {
    posX: number;
    posY: number;
};

export type GameItem = GameItemCoords & {
    sign: GameSign | null;
};
