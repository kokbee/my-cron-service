import { CronExpression } from '@modules/shared/config'
import { KORAIL_STATION } from '@modules/shared/enum/korail.enum'
import { Cron } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import now = jest.now

@Injectable()
export class CronService {

  @Cron(CronExpression.EVERY_SECONDS.SECOND_45)
  async getRail (): Promise<void> {
    const chromeUrl = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    const url1 = 'https://www.letskorail.com/ebizprd/prdMain.do'
    const browser = await puppeteer.launch({
        executablePath: chromeUrl,
        headless: false,
        waitForInitialPage: true,
      }
    )
    const page = await browser.newPage()
    await page.goto(url1, { waitUntil: 'networkidle2' })

    const goToStartEnd = [
      {
        tag: 'txtGoStart',
        station: KORAIL_STATION.SEOUL,
      },
      {
        tag: 'txtGoEnd',
        station: KORAIL_STATION.EAST_DAEGU,
      }
    ]

    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    // const day = nowDate.getDate()
    const day = 28

    const goToDateSelect = {
      day: {
        id: 'selGoStartDay',
        value: `${year}.${month}.${day}`,
      },
      time: {
        id: 'time',
        value: '10',
      },
      people: {
        id: 'people_num',
        value: '1',
      },
    }

    for (const { tag, station } of goToStartEnd) {
      const inputTag = `#${tag}`
      const inputValue: string = await page.$eval(`${inputTag}`, (el: HTMLInputElement) => el.value)
      await page.focus(inputTag)
      if (inputValue === station) {
        console.log(`${tag} 선택된 값이 같으므로 패스합니다.`)
        continue
      } else {
        if (inputValue.length > 0) {
          const pressLength = inputValue.length + 1
          for (let i = 0; i < pressLength; i++) {
            await page.keyboard.press('ArrowRight')
            await page.keyboard.press('Backspace', { delay: 100 })
          }
        }

        await page.type(`#${tag}`, `${station}`)
      }
    }
    console.log(`>>>>>>> ${goToStartEnd.map(({station})=> station).join(', ')} 역 선택완료`)

    await page.evaluate(() => {
      const startDateInput: any = document.getElementsByName('start')
      console.log(startDateInput)
      // if (startDateInput) {
      //   startDateInput.removeAttribute('readonly')
      //   startDateInput.value = goToDateSelect.day.value
      // }
    })

    await page.select(`select#${goToDateSelect.time.id}`, goToDateSelect.time.value)
    await page.select(`select#${goToDateSelect.people.id}`,  goToDateSelect.people.value)

    console.log(`>>>>>>> 검색 시작`)

    // await Promise.all([
    //   page.click('#res_cont_tab01 > form > div > fieldset > p > a > img', { delay: 1000 }),
    //   page.waitForNavigation({ waitUntil: 'networkidle2' })
    // ])

    // await browser.close()
  }
}
