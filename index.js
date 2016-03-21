'use strict'
const fetch = require('bgm-fetch')
const Spin = require('io-spin')
const stringWidth = require('string-width')
const chalk = require('chalk')
const indento = require('indento')

const spin = new Spin('Box1')

module.exports = function (cli) {
  const season = cli.flags.season
  const weekDay = cli.flags.weekday || new Date().getDay()
  const proxy = 'http://7d9hn8.com1.z0.glb.clouddn.com/wxt2005/bangumi-list/master/json/bangumi-__SEASON__.json'
  spin.start()
  fetch(season, {format: true, proxy})
    .then(data => {
      spin.stop()
      const today = data[weekDay]
      console.log('\n', indento(chalk.cyan(chineseWeekday(weekDay)), 1), '\n')
      let t = today
        .sort((a, b) => {
          const aTime = parseInt(a.timeCN || a.timeCN || 0, 10)
          const bTime = parseInt(b.timeCN || b.timeCN || 0, 10)
          return aTime - bTime
        })
        .map(item => {
          const time = item.timeCN ? `CN: ${formatTime(item.timeCN)}` : `JP: ${formatTime(item.timeJP)}`
          return [item.titleCN, time]
        })
      t = table(t)
      console.log(indento(t, 2), '\n')
    })
    .catch(e => {
      spin.stop()
      console.log(e.stack)
    })
}

function table(data) {
  let max = stringWidth(data[0][0])
  for (const item of data) {
    const currentWidth = stringWidth(item[0])
    if (currentWidth > max) {
      max = currentWidth
    }
  }
  return data.map(item => {
    const currentWidth = stringWidth(item[0])
    if (currentWidth < max) {
      item[0] += ' '.repeat(parseInt(max - currentWidth, 10))
    }
    return item.join('    ')
  }).join('\n')
}

function formatTime(time) {
  time = [time.substr(0, 2), time.substr(2)]
  return time.join(':')
}

function chineseWeekday(day) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
}
