import { getRandomInt } from "./colors";

export const playerNames = [
    'Jack',
    'Bob',
    'Fred',
    'George',
    'Daniel',
    'David',
    'Mary',
    'Tom',
    'Matt',
    'Greg',
];
export function randomPlayer() {
    return playerNames[getRandomInt(0,playerNames.length - 1)];
}