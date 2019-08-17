import { validateBoardJson } from './validateBoardJson';

describe('validateBoardJson', () => {
  it('should not throw an error if the input is valid', () => {
    const input = JSON.stringify({
      A7: { type: 'pawn', color: 'black', position: 'A7' },
      A8: { type: 'rook', color: 'black', position: 'A8' },
      B1: { type: 'knight', color: 'white', position: 'B1' },
      C2: { type: 'bishop', color: 'white', position: 'C2' },
      D3: { type: 'queen', color: 'white', position: 'D3' },
      E4: { type: 'king', color: 'white', position: 'E4' },
    });
    expect(() => validateBoardJson(input)).not.toThrow();
  });

  it('should throw an error if the input is not a valid json', () => {
    expect(() => validateBoardJson('{ a: }')).toThrow('JSON');
  });

  it('should throw an error if the input is not an object', () => {
    expect(() => validateBoardJson('"a"')).toThrow('object');
    expect(() => validateBoardJson('3')).toThrow('object');
    expect(() => validateBoardJson('[]')).toThrow('object');
  });

  it('should throw an error if a position is in invalid format', () => {
    const input1 = JSON.stringify({
      random: { type: 'pawn', color: 'black', position: 'A1' },
    });
    const input2 = JSON.stringify({
      a1: { type: 'pawn', color: 'black', position: 'A1' },
    });

    expect(() => validateBoardJson(input1)).toThrow(/position/i);
    expect(() => validateBoardJson(input2)).toThrow(/position/i);
  });

  it('should throw an error if a position is outside boundaries', () => {
    const input1 = JSON.stringify({
      A0: { type: 'pawn', color: 'black', position: 'A0' },
    });
    const input2 = JSON.stringify({
      A9: { type: 'pawn', color: 'black', position: 'A9' },
    });
    const input3 = JSON.stringify({
      I1: { type: 'pawn', color: 'black', position: 'A2' },
    });

    expect(() => validateBoardJson(input1)).toThrow(/position/i);
    expect(() => validateBoardJson(input2)).toThrow(/position/i);
    expect(() => validateBoardJson(input3)).toThrow(/position/i);
  });

  it('should throw an error if a piece is not an object', () => {
    const input1 = JSON.stringify({
      A1: 'pawn',
    });
    const input2 = null;

    expect(() => validateBoardJson(input1)).toThrow('object');
    expect(() => validateBoardJson(input2)).toThrow('object');
  });

  it('should throw an error if a piece is empty', () => {
    const input = JSON.stringify({
      A1: {},
    });

    expect(() => validateBoardJson(input)).toThrow(/piece/i);
  });

  it('should throw an error if a piece does not have a type', () => {
    const input = JSON.stringify({
      A1: { color: 'black', position: 'A1' },
    });

    expect(() => validateBoardJson(input)).toThrow(/type/i);
  });

  it('should throw an error if a type is invalid', () => {
    const input1 = JSON.stringify({
      A1: { type: 'random', color: 'black', position: 'A1' },
    });
    const input2 = JSON.stringify({
      A1: { type: 'Pawn', color: 'black', position: 'A1' },
    });

    expect(() => validateBoardJson(input1)).toThrow(/type/i);
    expect(() => validateBoardJson(input2)).toThrow(/type/i);
  });

  it('should throw an error if a piece does not have a color', () => {
    const input = JSON.stringify({
      A1: { type: 'pawn', position: 'A1' },
    });

    expect(() => validateBoardJson(input)).toThrow(/color/i);
  });

  it('should throw an error if a color is invalid', () => {
    const input1 = JSON.stringify({
      A1: { type: 'pawn', color: 'random', position: 'A1' },
    });
    const input2 = JSON.stringify({
      A1: { type: 'pawn', color: 'Black', position: 'A1' },
    });

    expect(() => validateBoardJson(input1)).toThrow(/color/i);
    expect(() => validateBoardJson(input2)).toThrow(/color/i);
  });

  it('should throw an error if a piece does not have a position', () => {
    const input = JSON.stringify({
      A1: { type: 'pawn', color: 'black' },
    });

    expect(() => validateBoardJson(input)).toThrow(/position/i);
  });

  it('should throw an error if a piece position is invalid', () => {
    const input1 = JSON.stringify({
      A1: { type: 'pawn', color: 'black', position: 'random' },
    });
    const input2 = JSON.stringify({
      A1: { type: 'pawn', color: 'black', position: 'a1' },
    });

    expect(() => validateBoardJson(input1)).toThrow(/position/i);
    expect(() => validateBoardJson(input2)).toThrow(/position/i);
  });

  it('should throw an error if a piece has an invalid property', () => {
    const input = JSON.stringify({
      A1: { type: 'pawn', color: 'black', position: 'A1', random: 'A1' },
    });

    expect(() => validateBoardJson(input)).toThrow(/property/i);
  });

  it('should throw an error if a the position key and the position in piece do not match', () => {
    const input = JSON.stringify({
      A1: { type: 'pawn', color: 'black', position: 'A2' },
    });

    expect(() => validateBoardJson(input)).toThrow(/position/i);
  });
});
