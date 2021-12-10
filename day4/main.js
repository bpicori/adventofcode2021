const fs = require("fs");

function parseBoards(boardsRaw) {
    const boards = [];
    let initBoard = [];
    for (const line of boardsRaw) {
        if (line !== "") {
            initBoard.push(line);
        } else {
            boards.push(initBoard);
            initBoard = [];
        }
    }
    return boards;
}

function parseDrawNumbers(drawNumbersRaw) {
    return drawNumbersRaw.split(',').map(e => parseFloat(e))
}

function initStats(boards) {
    const stats = [];
    for (let i = 0; i < boards.length; i++) {
        stats.push([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    }
    return stats;
}

function initMap(boards) {
    const map = {};
    boards.forEach((e, index) => {
        e.forEach((line, indexRow) => {
            const nr = line.split(' ').filter(e => e).map(e => parseFloat(e));
            nr.forEach((i, indexColumn) => {
                if (map[i]) {
                    map[i].push([index, indexRow, indexColumn]);
                } else {
                    map[i] = [[index, indexRow, indexColumn]];
                }
            })
        })
    })
    return map;
}

function findUnmarkedNumbers(board, nrs) {
    return board.reduce((acc, line) => {
        const l = line.split(' ').filter(e => e).map(e => parseFloat(e))
        acc.push(...l)
        return acc;
    }, []).filter(e => e).filter(e => !nrs.includes(e)).reduce((acc, e) => {
        acc += e;
        return acc;
    }, 0);
}

function mainPart1() {
    const [drawNumbersRaw, emptyLine, ...boardsRaw] = fs.readFileSync('./input.txt').toString().split('\n');
    const boards = parseBoards(boardsRaw);
    const stats = initStats(boards);
    const map = initMap(boards)

    const drawNumbers = drawNumbersRaw.split(',').map(e => parseInt(e)).filter(e => e);

    for (const nr of drawNumbers) {
        const boardsWithThisNr = map[nr];
        if (boardsWithThisNr && boardsWithThisNr.length) {
            for (const board of boardsWithThisNr) {
                const [boardNr, indexRow, indexColumn] = board;
                stats[boardNr][0][indexRow] += 1;
                const rowValue = stats[boardNr][0][indexRow];
                if (rowValue === 5) {
                    return findUnmarkedNumbers(boards[boardNr], drawNumbers.slice(0, drawNumbers.indexOf(nr) + 1)) * nr;
                }
                stats[boardNr][1][indexColumn] += 1;
                const columnValue = stats[boardNr][1][indexColumn];
                if (columnValue === 5) {
                    return findUnmarkedNumbers(boards[boardNr], drawNumbers.slice(0, drawNumbers.indexOf(nr) + 1)) * nr;
                }
            }
        }
    }
}

function mainPart2() {
    const [drawNumbersRaw, emptyLine, ...boardsRaw] = fs.readFileSync('./input.txt').toString().split('\n');
    const boards = parseBoards(boardsRaw);
    const stats = initStats(boards);
    const drawNumbers = parseDrawNumbers(drawNumbersRaw);
    const map = initMap(boards);
    const bingoBoards = [];
    const boardCache = []

    for (const nr of drawNumbers) {
        const boardsWithThisNr = map[nr];
        if (boardsWithThisNr) {
            for (const board of boardsWithThisNr) {
                const [boardNr, indexRow, indexColumn] = board;
                stats[boardNr][0][indexRow] += 1;
                const rowValue = stats[boardNr][0][indexRow];
                if (rowValue === 5 && !boardCache.includes(boardNr)) {
                    bingoBoards.push([boardNr, nr]);
                    boardCache.push(boardNr);
                }
                stats[boardNr][1][indexColumn] += 1;
                const columnValue = stats[boardNr][1][indexColumn];
                if (columnValue === 5 && !boardCache.includes(boardNr)) {
                    bingoBoards.push([boardNr, nr]);
                    boardCache.push(boardNr);
                }
            }
        }
    }
    const lastBoardWinning = bingoBoards[bingoBoards.length - 1][0];
    const lastNumber = bingoBoards[bingoBoards.length - 1][1];
    const sliceNrs = drawNumbers.slice(0, drawNumbers.indexOf(lastNumber) + 1)
    const unMarkedSum = findUnmarkedNumbers(boards[lastBoardWinning], sliceNrs);
    return unMarkedSum * lastNumber;
}

console.log(mainPart1())
console.log(mainPart2());
