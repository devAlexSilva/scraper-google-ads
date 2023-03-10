import pup from 'puppeteer'

const url = 'https://www.google.com.br/'

let itemCountInList = 0

const scraper = async (productName) => {
  const browser = await pup.launch()
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

  const title = await page.$$eval('.BXIkFb .tAxDx', item => item.map(i => i.innerText))
  const price = await page.$$eval('.BXIkFb .a8Pemb', item => item.map(i => i.innerText))
  const loja = await page.$$eval('.BXIkFb .aULzUe', item => item.map(i => i.innerText))
  const link = await page.$$eval('.BXIkFb .shntl > div > a ~ a', item => item.map(i => i.href))
  const image = await page.$$eval('.BXIkFb .ArOc1c > img', item => item.map(i => i.src))

  const list = []

  for (let i = 0; i < title.length; i++) {
    list.push({
      title: title[i],
      price: price[i],
      loja: loja[i],
      urlLink: link[i],
      image: image[i]
    })

    itemCountInList++
  }

  await page.close()
  return list
}

const sortSellersPrice = (itemList = [{}]) => {
  itemList.forEach(item => {
    item.price = item.price.slice(3).replace(',', '.')
  })

  itemList.sort((a, b) => a.price - b.price)
}

const listOwnBrand = (itemList, brand) => {
  const ownBrandList = itemList.filter(item => item.title.toLowerCase().includes(brand))

  return ownBrandList || []
}

const list_AL_itens = (itemList) => {
  const list = itemList.filter(item => item.loja.toLowerCase().includes('atacado do lojista'))

  return list || []
}

export const GetList = async (req, res) => {
  const productName = req.query.name
  
  const fullList = await scraper(productName)
  sortSellersPrice(fullList)

  const ownBrandListed = listOwnBrand(fullList, 'ecobomba')
  const listWithAL = list_AL_itens(fullList)

  const data = {
    total: itemCountInList,
    ownBrandList: ownBrandListed,
    listWithAL: listWithAL,
    fullList: fullList
  }

  console.log(data)
  res.json(data)
}