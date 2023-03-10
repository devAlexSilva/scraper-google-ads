import pup from 'puppeteer'

const url = 'https://www.google.com.br/'

let itemCountInList = 0

const scraper = async (productName) => {
  const browser = await pup.launch({ headless: false })
  const page = await browser.newPage()

  itemCountInList = 0 //zerando o contador a cada nova chamada

  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.type('.gLFyf', productName)

  await Promise.all([
    page.waitForNavigation(),
    page.click('.FPdoLc > center > input')
  ])


  // tratativa de erro nos casos em que muda a posição do Shopping
  const isShopping = await page.$eval('.MUFPAc > .hdtb-mitem:nth-child(2) > a', link => link.innerText === 'Shopping')

  isShopping ? (
    await Promise.all([
      console.log('click 2'),
      page.waitForNavigation({ timeout: 0, waitUntil: 'domcontentloaded' }),
      page.click('.MUFPAc > .hdtb-mitem:nth-child(2) > a')
    ])
  ) : (
    await Promise.all([
      console.log('click 3'),
      page.waitForNavigation({ timeout: 0, waitUntil: 'domcontentloaded' }),
      await page.click('.MUFPAc > .hdtb-mitem:nth-child(3) > a')
    ])

  )


  await Promise.all([
    page.waitForNavigation({ timeout: 0, waitUntil: 'domcontentloaded' }),
    await page.click('.xCpuod')
  ])

  await page.waitForSelector('.sh-ds__trunc-txt.translate-content')

  let description = ''

  try {
    description = await page.$eval('.sh-ds__full-txt.translate-content', desc => desc.innerText)
  } catch (error) {
    description = await page.$eval('.sh-ds__trunc-txt.translate-content', desc => desc.innerText)
  }

  console.log('desc: ', description)
  
  return description

  //await page.close()
}