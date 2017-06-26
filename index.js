'use strict'
const fetch = require('bgm-fetch')
const ora = require('ora')
const stringWidth = require('string-width')
const chalk = require('chalk')
const indento = require('indento')
const table = require('text-table')

const spin = ora()

module.exports = function (cli) {
  const season = cli.flags.season
  const weekDay = cli.flags.weekday || new Date().getDay()
  const proxy = 'http://7d9hn8.com1.z0.glb.clouddn.com/bangumi-data/bangumi-data/master/data/items/{year}/{season}.json'
  spin.start()
  fetch({
    format: true,
    season,
    proxy
  }).then(data => {
      spin.stop()
      const today = data[weekDay]
      console.log('\n', indento(chalk.cyan(chineseWeekday(weekDay)), 1), '\n')
      console.log(table(today.map(item => [
        '  '+ item['titleTranslate']['zh-Hans'][0],
        formatTime(item.begin)
      ]), {
        stringLength: stringWidth
      }))
      console.log()
    })
    .catch(e => {
      spin.stop()
      console.error(e.stack)
    })
}

function formatTime(time) {
  const d = new Date(time)
  return `${ensureTime(d.getHours())}:${ensureTime(d.getMinutes())}`
}

function chineseWeekday(day) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
}

function ensureTime(t) {
  return t < 10 ? `0${t}` : t
}
