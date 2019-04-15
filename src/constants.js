import { Color, PieceType, SettingKey, Theme } from './enums';

export const APP_NAME = 'chasemate';

export const PieceCodes = {
  [Color.BLACK]: {
    [PieceType.BISHOP]: '\u265D',
    [PieceType.KING]: '\u265A',
    [PieceType.KNIGHT]: '\u265E',
    [PieceType.PAWN]: '\u265F',
    [PieceType.QUEEN]: '\u265B',
    [PieceType.ROOK]: '\u265C',
  },
  [Color.WHITE]: {
    [PieceType.BISHOP]: '\u2657',
    [PieceType.KING]: '\u2654',
    [PieceType.KNIGHT]: '\u2658',
    [PieceType.PAWN]: '\u2659',
    [PieceType.QUEEN]: '\u2655',
    [PieceType.ROOK]: '\u2656',
  },
};

export const DefaultSettings = {
  [SettingKey.DEFAULT_THEME]: Theme.LIGHT,
  [SettingKey.MAX_MOVES]: 2,
  [SettingKey.STARTING_COLOR]: Color.WHITE,
};
