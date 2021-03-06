import {
  findsMiniGame,
  findsPlayable,
  findsMiniStatus,
  findsWinOrDeny,
  findsLine2Continue,
  findsNewLine,
  findsZeroEffect,
  randomNum} from './lib/getInfoV2'
import {mockOutArr} from './lib/mockOutArr'
import {isMoveHarikari} from './lib/isMoveHarikari'
import {doesMoveSend2Dead} from './lib/doesMoveSend2Dead'
import {getsAllPlayable} from './lib/getsAllPlayable'
import {findsVictories} from './lib/findsVictories'
import {aiFirstGoScore, ai2ndGoScore,
  humanFirstGoScore, human2ndGoScore} from './lib/points'
import {hasGameEnded} from './lib/hasGameEnded'
import {deepClone} from './lib/deepClone'
import {generateAiArr} from '../gameArrays'

export const mediumAiV2 = (arr, ai, human) => {
  let aiDb = generateAiArr()
  let mini = findsMiniGame(arr, [], aiDb)
  scans4Possibilities(arr, ai.name, human.name, mini, aiDb, true)
  let coOrds = gradeAndSelect(arr, aiDb, ai.name, human.name) // if vic has not already been found, grade moves
  return {mini: coOrds[0], cell: coOrds[1]}
}

const scans4Possibilities = (arr, ai, human, mini, aiDb, boo) => {
  for (let i = 0; i < mini.length; i++) {
    let {aiOwns, playable, humanOwns} =
    findsPlayable(arr, mini[i], ai, human, aiDb, true)
    findsWinOrDeny(aiOwns, playable, aiDb, mini[i], boo)
    findsWinOrDeny(humanOwns, playable, aiDb, mini[i], !boo)
    findsLine2Continue((boo ? aiOwns : humanOwns), playable, mini[i], aiDb, true)
    findsNewLine(playable, mini[i], aiDb, true)
    findsZeroEffect(aiDb[i])
  }
  let z = findsMiniStatus(arr, ai, human)
  findsLine2Continue((boo ? z.aiOwns : z.humanOwns), z.playable, 0, aiDb, false) // for the big game
  findsNewLine(z.playable, 0, aiDb, false) // for the big game
}

const gradeAndSelect = (arr, aiDb, ai, human) => {
  let allPlayable = getsAllPlayable(aiDb)
  gradesMoves(arr, allPlayable, ai, human, aiDb)
  if (allPlayable.length > 1) {
    return findsHighestScore(allPlayable)
  } else return allPlayable[0].coOrds
}

const findsHighestScore = (moves) => {
  moves.sort((a, b) => b.totScore - a.totScore)
  if (moves[0].totScore === moves[1].totScore) {
    return randomize(moves)
  } else return moves[0].coOrds
}

const randomize = (moves) => {
  let sameScore = [moves[0]]
  for (let i = 1; i < moves.length; i++) {
    if (moves[i].totScore === sameScore[0].totScore) {
      sameScore.push(moves[i])
    }
  }
  return sameScore[randomNum(sameScore.length)].coOrds
}

const gradesMoves = (arr, allPlayable, ai, human, aiDb) => {
  // let allHuVics = findsHumanVictory(arr, ai, human, aiDb)
  // findsAiVictory(arr, ai, human, aiDb)
  let allHuVics = findsVictories(arr, ai, human, aiDb, false)
  findsVictories(arr, ai, human, aiDb, true)
  for (let i = 0; i < allPlayable.length; i++) {
    let toPlay = Number(allPlayable[i].coOrds[1])
    let mini = allPlayable[i].coOrds[0]
    let x = aiDb[mini][toPlay]
    let tempArr = deepClone(arr)
    x.win ? mockOutArr(tempArr, mini, toPlay, ai, true) // ai 'pseudo taken 1st' move
      : mockOutArr(tempArr, mini, toPlay, ai, false)
    doesMoveSend2Dead(arr, aiDb, toPlay, mini, x) // or same
    isMoveHarikari(aiDb, toPlay, x, allHuVics, true)
    aiFirstGoScore(x)
    if (!x.harikari && !x.victory && !hasGameEnded(tempArr)) {
      humanTurn(tempArr, ai, human, x)
      x.totScore += Math.min.apply(Math, x.hu1stScore)
      x.hu1stScore = []
    }
  }
}

const humanTurn = (arr, ai, human, x) => {
  let huDb = generateAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  // findsHumanVictory(arr, ai, human, huDb)
  // let allAiVics = findsAiVictory(arr, ai, human, huDb)
  findsVictories(arr, ai, human, huDb, false)
  let allAiVics = findsVictories(arr, ai, human, huDb, true)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    let tempArr = deepClone(arr)
    y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
      : mockOutArr(tempArr, huMini, huToPlay, human, false)
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y, allAiVics, false)
    humanFirstGoScore(y, x.hu1stScore)
    if (!y.harikari && !y.victory && !hasGameEnded(tempArr)) {
      aiTurn(tempArr, ai, human, x)
      x.hu1stScore[j] += Math.max.apply(Math, x.ai2ndScore)
      x.ai2ndScore = []
    }
  }
}

const aiTurn = (arr, ai, human, x) => {
  let aiDb2 = generateAiArr()
  let aiMinis = findsMiniGame(arr, [], aiDb2)
  scans4Possibilities(arr, ai, human, aiMinis, aiDb2, true)
  let aiPlayable = getsAllPlayable(aiDb2)
  // let allHuVics = findsHumanVictory(arr, ai, human, aiDb2)
  // findsAiVictory(arr, ai, human, aiDb2)
  let allHuVics = findsVictories(arr, ai, human, aiDb2, false)
  findsVictories(arr, ai, human, aiDb2, true)
  for (let i = 0; i < aiPlayable.length; i++) {
    let aiMini = aiPlayable[i].coOrds[0]
    let aiToPlay = aiPlayable[i].coOrds[1]
    let z = aiDb2[aiMini][aiToPlay]
    let tempArr = deepClone(arr)
    z.win ? mockOutArr(tempArr, aiMini, aiToPlay, ai, true)
      : mockOutArr(tempArr, aiMini, aiToPlay, ai, false)
    doesMoveSend2Dead(arr, aiDb2, aiToPlay, aiMini, z)
    isMoveHarikari(aiDb2, aiToPlay, z, allHuVics, true)
    ai2ndGoScore(z, x.ai2ndScore)
    if (!z.harikari && !z.victory && !hasGameEnded(tempArr)) {
      human2ndTurn(tempArr, ai, human, x)
      x.ai2ndScore[i] += Math.min.apply(Math, x.hu2ndScore)
      x.hu2ndScore = []
    }
  }
}

const human2ndTurn = (arr, ai, human, x) => {
  let huDb = generateAiArr()
  let huMinis = findsMiniGame(arr, [], huDb)
  scans4Possibilities(arr, ai, human, huMinis, huDb, false)
  let huPlayable = getsAllPlayable(huDb)
  // findsHumanVictory(arr, ai, human, huDb)
  // let allAiVics = findsAiVictory(arr, ai, human, huDb)
  findsVictories(arr, ai, human, huDb, false)
  let allAiVics = findsVictories(arr, ai, human, huDb, true)
  for (let j = 0; j < huPlayable.length; j++) {
    let huMini = huPlayable[j].coOrds[0]
    let huToPlay = huPlayable[j].coOrds[1]
    let y = huDb[huMini][huToPlay]
    doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
    isMoveHarikari(huDb, huToPlay, y, allAiVics, false)
    human2ndGoScore(y, x.hu2ndScore)
    // let tempArr = deepClone(arr)
    // y.win ? mockOutArr(tempArr, huMini, huToPlay, human, true) // human 'pseudo taken 2nd' move, should not use x.win
    //   : mockOutArr(tempArr, huMini, huToPlay, human, false)

    // if (!y.harikari && !y.victory && !hasGameEnded(tempArr)) {
    //   ai3rdTurn(tempArr, ai, human, x)
    //   x.hu2ndScore[j] += Math.max.apply(Math, x.ai3rdTurn)
    //   x.ai3rdTurn = []
    // }
  }
}

// const ai3rdTurn = (arr, ai, human, x) => {
//   let aiDb2 = generateAiArr()
//   let aiMinis = findsMiniGame(arr, [], aiDb2)
//   scans4Possibilities(arr, ai, human, aiMinis, aiDb2, true)
//   let aiPlayable = getsAllPlayable(aiDb2)
//   let allHuVics = findsHumanVictory(arr, ai, human, aiDb2)
//   findsAiVictory(arr, ai, human, aiDb2)
//   for (let i = 0; i < aiPlayable.length; i++) {
//     let aiMini = aiPlayable[i].coOrds[0]
//     let aiToPlay = aiPlayable[i].coOrds[1]
//     let z = aiDb2[aiMini][aiToPlay]
//     let tempArr = deepClone(arr)
//     // let tempArr = JSON.parse(JSON.stringify(arr))
//     z.win ? mockOutArr(tempArr, aiMini, aiToPlay, ai, true)
//       : mockOutArr(tempArr, aiMini, aiToPlay, ai, false)
//     doesMoveSend2Dead(arr, aiDb2, aiToPlay, aiMini, z)
//     isMoveHarikari(aiDb2, aiToPlay, z, allHuVics, true)
//     ai2ndGoScore(z, x.ai2ndScore)
//     if (!z.harikari && !z.victory && !hasGameEnded(tempArr)) {
//       human3rdTurn(tempArr, ai, human, x)
//       x.ai3rdScore[i] += Math.min.apply(Math, x.hu3ndScore)
//       x.hu3ndScore = []
//     }
//   }
// }

// const human3rdTurn = (arr, ai, human, x) => {
//   let huDb = generateAiArr()
//   let huMinis = findsMiniGame(arr, [], huDb)
//   scans4Possibilities(arr, ai, human, huMinis, huDb, false)
//   let huPlayable = getsAllPlayable(huDb)
//   findsHumanVictory(arr, ai, human, huDb)
//   let allAiVics = findsAiVictory(arr, ai, human, huDb)
//   for (let j = 0; j < huPlayable.length; j++) {
//     let huMini = huPlayable[j].coOrds[0]
//     let huToPlay = huPlayable[j].coOrds[1]
//     let y = huDb[huMini][huToPlay]
//     doesMoveSend2Dead(arr, huDb, huToPlay, huMini, y)
//     isMoveHarikari(huDb, huToPlay, y, allAiVics, false)
//     human2ndGoScore(y, x.hu2ndScore)
//   }
// }
