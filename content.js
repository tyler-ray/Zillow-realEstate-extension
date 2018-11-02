chrome.runtime.onMessage.addListener(seperateCallback) // Message Accepter
var PPSQFT = 150 //Price per square foot, will be set by user
var DOM = 60 // days on market from user input
var downBudget = 10000 //ideal amount user wants to put down.

function seperateCallback(){ //Callback fired on accept message.
    console.log('clicked')
}

setTimeout(pause, 2000) // pause before starting program

function pause(){ // set interval to run code.
    console.clear()
    console.log('pause')
    setTimeout(myCallback,3000)
}
function myCallback() { // code to be run every 3 seconds
    console.clear()

    const outlineNode = document.querySelectorAll('.zsg-photo-card') //Selects one unit / component / house listing
    const housesArrOBJ = []
    const housesArrDOC = []
    const buyListOBJ = []
    const buyListDOC = []
    
    for (e of outlineNode) {
        let temp = e.querySelector('.zsg-photo-card-info').innerText.split(' · ')  // gets sqft and beds and baths

        let DOZ = e.querySelector('.zsg-photo-card-badge').innerText
        let priceTemp = e.querySelector('.zsg-photo-card-price').innerHTML
        let priceTemp2 = Number(priceTemp.replace(/[^0-9.-]+/g,"")) // turns $190,000 into 190000
        let sqftTemp =  temp[2].split(' ')[0]
        let sqftTemp2 = Number(sqftTemp.replace(/[^0-9.-]+/g,"")) // turns 2,309 into 2309

        let obj = { // house object created
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

        DOZ.includes('Zillow')? obj.DOM = DOZ.split(' ')[0] : obj.DOM = undefined //checks if the Days on Zillow exists, if not, DOM is set to undefined.

// console.log(obj.DOM)

        obj.priceSQFT= Math.round(obj.price/obj.sqft) // adds price per square foot to the object.

        if(obj.priceSQFT < PPSQFT){ // if decent, will push to the buy list, both the object list and the document list
            buyListOBJ.push(obj)
            buyListDOC.push(e)
        }

        if((obj.priceSQFT <PPSQFT && obj.DOM === undefined) || ( obj.priceSQFT < PPSQFT &&  obj.DOM <DOM)){ // if its a decent buy, but there is no DOM or DOM is smaller than expected will turn yellow
            e.style.border = '30px solid yellow'
        }

        if(obj.priceSQFT < PPSQFT && obj.DOM >DOM && obj.DOM !== undefined){ // if it's a good buy based on the paramaters (will be set by user)
            obj.goodBuy = true; 
            e.style.border = '30px solid lightgreen'
        }

    }
        // housesArrOBJ.push(obj)
        // housesArrDOC.push(e)
        // These will push all house objects and elements to full arrays if needed.

pause() // will run a setTimeout which will run this function again in a few seconds.
    }


