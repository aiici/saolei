/*
 * @Date         : 2020-03-13 20:29:56
 * @LastEditors  : Mao NianYou
 * @LastEditTime : 2020-04-25 22:27:13
 */

const OPERATOR = {
  add: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  equal: '=',
}

const DEVIDE_ZERO_ERROR = "Can not devide by 0"

/**
 * 各计算用函数
 */
const calcFunc = {
  add: (x, y) => wrapAddMinus(x, y, (x1, y1) => x1 + y1),
  minus: (x, y) => wrapAddMinus(x, y, (x1, y1) => x1 - y1),
  multiply: (x, y) => wrapMultiplyDivide(x, y, (x1, y1)=> x1.value * y1.value / Math.pow(10, (x1.exponents + y1.exponents))),
  divide: (x, y) => wrapMultiplyDivide(x, y, (x1, y1)=> x1.value / y1.value / Math.pow(10, (x1.exponents + y1.exponents))),
}

const REG_DECIMAL = new RegExp(/^(:?-)?\d+\.(:?\d*)?$/)
const isDecimal = (val, reg) => reg.test(val)

const wrapAddMinus = (x, y, fnc) => {
  if (isDecimal(x, REG_DECIMAL) || isDecimal(y, REG_DECIMAL)) {
    return fnc(x * 10000, y * 10000) / 10000
  }
  return fnc(x , y)
}

const wrapMultiplyDivide = (x, y, fnc) => {

  /*
   * value：数值字符串化使之成为整数
   * 1.23 -> 123
   * 0.14 -> 014
   * 
   * exponents：去掉小数点所扩大的倍数（10的n次幂）
   * 1024 -> 0
   * 0.14 -> 2
   */
  function detect(float) {
    const arr = (float + '').split('.')
    const exponents = arr.length > 1 ? arr[1].length : 0

    return {
      value: arr.join(''),
      exponents: exponents
    }
  }

  const x1 = detect(x)
  const y1 = detect(y)

  return fnc(x1 , y1)
}

/**
 * 执行计算函数获取计算结果
 * @param {string} x 用于计算的第一个数值
 * @param {string} y 用于计算的第二个数值
 * @param {string} operator 计算操作符
 */
function calculate(x, y, operator) {
  if (y == '0' && operator === OPERATOR.divide) return DEVIDE_ZERO_ERROR

  x = parseNumber(x)
  y = parseNumber(y)
  
  const func = calcFunc[Object.entries(OPERATOR).find(o=>o[1]===operator)[0]]
  return func(x, y)
}

/**
 * 将string转为数值（int/float）
 * @param {string} x string类型的数值
 */
function parseNumber(x) {
  const reg = /./g
  return (reg.test(x) ? parseFloat(x) : parseInt(x))
}

const getRandomNums = (min, max, len) => {
  if (max <= min) return []
  const total = max - min + 1
  len = len || total
  if (len > total) throw new Error(`cant take ${len} from ${total}`)
  
  let arr = new Array(total).fill(null).map((v,i)=>i)
  arr.sort(()=>0.49 - Math.random())
  arr.length = len
  return arr
}

module.exports = {
  calculate: calculate,
  OPERATOR: OPERATOR,
  getRandomNums,
  REG_DECIMAL,
  isDecimal,
  DEVIDE_ZERO_ERROR,
}
