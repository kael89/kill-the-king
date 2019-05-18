import validateBoard from './validateBoard';

const getAllInitialWhitePawns = () => ({
  A2: { color: 'white', position: 'A2', type: 'pawn' },
  B2: { color: 'white', position: 'B2', type: 'pawn' },
  C2: { color: 'white', position: 'C2', type: 'pawn' },
  D2: { color: 'white', position: 'D2', type: 'pawn' },
  E2: { color: 'white', position: 'E2', type: 'pawn' },
  F2: { color: 'white', position: 'F2', type: 'pawn' },
  G2: { color: 'white', position: 'G2', type: 'pawn' },
  H2: { color: 'white', position: 'H2', type: 'pawn' },
});

describe('BoardHelper', () => {
  describe('validate', () => {
    it('must return an error if a white pawn is in the first row', () => {
      const board = { A1: { color: 'white', position: 'A1', type: 'pawn' } };
      expect(validateBoard(board)).toEqual('A white pawn cannot appear at row number 1');
    });

    it('must return an error if a white pawn is in the last row', () => {
      const board = { A8: { color: 'white', position: 'A8', type: 'pawn' } };
      expect(validateBoard(board)).toEqual('A white pawn has to be promoted at row number 8');
    });

    it('must return an error if a black pawn is in the first row', () => {
      const board = { A1: { color: 'black', position: 'A1', type: 'pawn' } };
      expect(validateBoard(board)).toEqual('A black pawn has to be promoted at row number 1');
    });

    it('must return an error if a black pawn is in the first row', () => {
      const board = { A8: { color: 'black', position: 'A8', type: 'pawn' } };
      expect(validateBoard(board)).toEqual('A black pawn cannot appear at row number 8');
    });

    it('must return an error if more than 2 kings of the same color exist', () => {
      const board = {
        A2: { color: 'black', position: 'A2', type: 'king' },
        B2: { color: 'black', position: 'B2', type: 'king' },
      };
      expect(validateBoard(board)).toEqual('A chess board cannot have more than 2 black kings');
    });

    it('must return an error if more than 8 pawns of the same color exist', () => {
      const board = getAllInitialWhitePawns();
      expect(validateBoard(board)).toEqual('The total number of white pawns must be less than 8');
    });

    it('must return an error if the total number of same color queens is not achievable', () => {
      const board = {
        ...getAllInitialWhitePawns(),
        A3: { color: 'white', position: 'A3', type: 'queen' },
        B3: { color: 'white', position: 'B3', type: 'queen' },
      };
      expect(validateBoard(board)).toEqual(
        'The total number of white queens is not achievable based on the number of potentially promoted pawns',
      );
    });

    it('must not return an error if the total number of same color queens is achievable', () => {
      const board = {
        A3: { color: 'white', position: 'A3', type: 'queen' },
        B3: { color: 'white', position: 'B3', type: 'queen' },
      };
      expect(validateBoard(board)).toEqual('');
    });

    it('must return an error if the total number of same color queens and rooks is not achievable', () => {
      // We have a total of six pawns of the same color, which means that up to two
      // pawns could have been promoted in past moves.
      // However, we also have 2 queens and 1 rook above the standard number, which would
      // require at least 3 promotions.
      const board = {
        A2: { color: 'white', position: 'A2', type: 'pawn' },
        B2: { color: 'white', position: 'B2', type: 'pawn' },
        C2: { color: 'white', position: 'C2', type: 'pawn' },
        D2: { color: 'white', position: 'D2', type: 'pawn' },
        E2: { color: 'white', position: 'E2', type: 'pawn' },
        F2: { color: 'white', position: 'F2', type: 'pawn' },
        A3: { color: 'white', position: 'A3', type: 'queen' },
        B3: { color: 'white', position: 'B3', type: 'queen' },
        C3: { color: 'white', position: 'C3', type: 'queen' },
        A4: { color: 'white', position: 'A3', type: 'rook' },
        B4: { color: 'white', position: 'B3', type: 'rook' },
        C4: { color: 'white', position: 'C3', type: 'rook' },
      };
      expect(validateBoard(board)).toEqual(
        'The total number of white queens and rooks is not achievable based on the number of potentially promoted pawns',
      );
    });

    it('must not return an error if the total number of same color queens and rooks is achievable', () => {
      const board = {
        A3: { color: 'white', position: 'A3', type: 'queen' },
        B3: { color: 'white', position: 'B3', type: 'queen' },
        A4: { color: 'white', position: 'A3', type: 'rook' },
        B4: { color: 'white', position: 'B3', type: 'rook' },
        C4: { color: 'white', position: 'C3', type: 'rook' },
      };
      expect(validateBoard(board)).toEqual('');
    });

    it('must return an error if the number of same color bishops which move in the same colors is not achievable', () => {
      const board = {
        ...getAllInitialWhitePawns(),
        A3: { color: 'white', position: 'A3', type: 'bishop' },
        B4: { color: 'white', position: 'B3', type: 'bishop' },
      };
      expect(validateBoard(board)).toEqual(
        'The total number of white bishops which move in black squares is not achievable based on the number potentially promoted pawns',
      );
    });

    it('must not return an error if the number of same color bishops is achievable', () => {
      const board = {
        A3: { color: 'white', position: 'A3', type: 'bishop' },
        B4: { color: 'white', position: 'B3', type: 'bishop' },
      };
      expect(validateBoard(board)).toEqual('');
    });

    it('must return an error if the number of same color pawns in the same column is not achievable', () => {
      const board = {
        A2: { color: 'white', position: 'A2', type: 'pawn' },
        A3: { color: 'white', position: 'A3', type: 'pawn' },
        A4: { color: 'white', position: 'A4', type: 'pawn' },
        A5: { color: 'white', position: 'A5', type: 'pawn' },
        A6: { color: 'white', position: 'A6', type: 'pawn' },
        A7: { color: 'black', position: 'A7', type: 'pawn' },
        B7: { color: 'black', position: 'B7', type: 'pawn' },
        C7: { color: 'black', position: 'C7', type: 'pawn' },
        D7: { color: 'black', position: 'D7', type: 'pawn' },
        E7: { color: 'black', position: 'E7', type: 'pawn' },
        F7: { color: 'black', position: 'F7', type: 'pawn' },
        G7: { color: 'black', position: 'G7', type: 'pawn' },
        H7: { color: 'black', position: 'H7', type: 'pawn' },
        A8: { color: 'black', position: 'A8', type: 'rook' },
        B8: { color: 'black', position: 'B8', type: 'knight' },
        C8: { color: 'black', position: 'C8', type: 'bishop' },
        D8: { color: 'black', position: 'D8', type: 'queen' },
        E8: { color: 'black', position: 'E8', type: 'king' },
        F8: { color: 'black', position: 'F8', type: 'bishop' },
        G8: { color: 'black', position: 'G8', type: 'knight' },
        H8: { color: 'black', position: 'H8', type: 'rook' },
      };
      expect(validateBoard(board)).toEqual(
        'The total number of white pawns in the same column is not achievable based on the number of potentially captured black pieces',
      );
    });

    it('must not return an error if the number of same color pawns in the same column is achievable', () => {
      const board = {
        A2: { color: 'white', position: 'A2', type: 'pawn' },
        A3: { color: 'white', position: 'A3', type: 'pawn' },
      };
      expect(validateBoard(board)).toEqual('');
    });
  });
});
