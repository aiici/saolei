/*
 * @Date         : 2020-04-19 22:11:13
 * @LastEditors  : Mao NianYou
 * @LastEditTime : 2020-04-19 22:26:33
 */
class MineCell {
    constructor(x, y, isMine = false){
        this.init(x, y, isMine)
    }

    init(x, y, isMine){
        this.x = x
        this.y = y
        this.isMine = isMine
        this.minesAroundCount = 0
        this.cellDisplayType = CellDisplayType.INIT
    }

    finish() {
        if (this.cellDisplayType === CellDisplayType.FLAG || this.cellDisplayType === CellDisplayType.EXPLOSION) {
            // nothing to do
        }
        else if (this.isMine) {
            this.cellDisplayType = CellDisplayType.MINE
        }
        else if (this.minesAroundCount === 0) {
            this.cellDisplayType = CellDisplayType.EMPTY
        }
        else {
            this.cellDisplayType = CellDisplayType.NUMBER
        }
    }
}

const CellDisplayType = {
    INIT: 'init',
    NUMBER: 'number',
    EMPTY: 'empty',
    MINE: 'mine',
    FLAG: 'flag',
    EXPLOSION: 'explosion',
}

module.exports = {
    MineCell,
    CellDisplayType,
}