console.log('background running')

chrome.browserAction.onClicked.addListener(buttonClicked)


function buttonClicked(tab){
    console.log('button clicked!')
    console.log(tab)
    let msg = {
        txt:'You clicked me!'
    }
    chrome.tabs.sendMessage(tab.id,msg)
}
