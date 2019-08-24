import httpService from './httpService'

const getScore = () => httpService.get('/score')
const getScoreGraph = () => httpService.get('/score-graph')

export default {
  getScore,
  getScoreGraph
}