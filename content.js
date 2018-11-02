chrome.runtime.onMessage.addListener(myCallback)
var PPSQFT = 150
var DOM = 5
var downBudget = 10000


function myCallback() {
    console.clear()

    const outlineNode = document.querySelectorAll('.zsg-photo-card')
    const housesArrOBJ = []
    const housesArrDOC = []
    const buyListOBJ = []
    const buyListDOC = []
    
    for (e of outlineNode) {
        let temp = e.querySelector('.zsg-photo-card-info').innerText.split(' · ')
        // temp.map(e=>{return e.trim()})

        let DOZ = e.querySelector('.zsg-photo-card-badge').innerText
        let priceTemp = e.querySelector('.zsg-photo-card-price').innerHTML
        let priceTemp2 = Number(priceTemp.replace(/[^0-9.-]+/g,""))
        let sqftTemp =  temp[2].split(' ')[0]
        let sqftTemp2 = Number(sqftTemp.replace(/[^0-9.-]+/g,""))
        let obj = {
            address: e.querySelector('.zsg-photo-card-address').innerHTML,
            priceSQFT:0,
            goodBuy:false,
            price:priceTemp2,
            DOM:e.querySelector('.zsg-photo-card-badge').innerText,
            beds: temp[0].split(' ')[0],
            baths: temp[1].split(' ')[1],
            sqft: sqftTemp2,
            zpid:e.dataset.zpid,
            latitude:e.dataset.latitude,
            logitude:e.dataset.longitude,
        }
        DOZ.includes('Zillow')? obj.DOM = DOZ.split(' ')[0] : obj.DOM = undefined

// console.log(obj.DOM)

        obj.priceSQFT= Math.round(obj.price/obj.sqft)

        if(obj.priceSQFT < PPSQFT){
            // obj.goodBuy = true
            buyListOBJ.push(obj)
            buyListDOC.push(e)
        }

        if((obj.priceSQFT <PPSQFT && obj.DOM === undefined) || ( obj.priceSQFT < PPSQFT &&  obj.DOM >DOM)){
            e.style.border = '30px solid yellow'
        }

        if(obj.priceSQFT < PPSQFT && obj.DOM >DOM && obj.DOM !== undefined){
            obj.goodBuy = true;
            e.style.border = '30px solid lightgreen'
        }

    }
        // housesArrOBJ.push(obj)
        // housesArrDOC.push(e)
// pause()
    }


