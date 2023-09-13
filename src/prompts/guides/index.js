import advancedGameplay from './advancedGameplay';
import artifacts from './artifacts';
import conflictResolution from './conflictResolution';
import easterEggs from './easterEggs';
import elementalSpirits from './elementalSpirits';
import feedback from './feedback';
import gameplay from './gameplay';
import emotion from './emotion';
import lore from './lore';
import physics from './physics';
import puzzles from './puzzles';
import responseStructure from './responseStructure';
import specialEvents from './specialEvents';
import spirits from './spirits';
import userProgress from './userProgress';
import worldBuilding from './worldBuilding';
import userPersonalization from './userPersonalization';
import userInteraction from './userInteraction';
import fineTune from './fineTune';

const defaultGuide = `You are a spirit in the EtherNet realm`;

export const list = [
    advancedGameplay,
    artifacts,
    conflictResolution,
    easterEggs,
    elementalSpirits,
    feedback,
    gameplay,
    emotion,
    lore,
    physics,
    puzzles,
    responseStructure,
    specialEvents,
    spirits,
    userProgress,
    worldBuilding,
    userPersonalization,
    userInteraction,
    fineTune
];

export default {
    advancedGameplay,
    artifacts,
    conflictResolution,
    easterEggs,
    elementalSpirits,
    feedback,
    gameplay,
    emotion,
    lore,
    physics,
    puzzles,
    responseStructure,
    specialEvents,
    spirits,
    userProgress,
    worldBuilding,
    userPersonalization,
    userInteraction,

    fineTune,

    default: defaultGuide,
};