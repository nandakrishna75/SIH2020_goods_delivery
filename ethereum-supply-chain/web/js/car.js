import { carListManager, addItemToList, format_date, init_web3, partListManager, carPartListManager, getMultipleActivePart, getActivePart, clearCarDetails, getOwnerHistoryFromEvents, getOwnedItemsFromEvent } from "./utils.js"



window.onload = async function () {

    var x = await init_web3()

    document.getElementById("part-list-details").style.display = "none"

    //Get all the parts that belonged to this factory and then check the ones that still do
    var parts = await getOwnedItemsFromEvent(window.accounts[0], 'TransferPartOwnership')
    console.log(parts)
    console.log("parts listed")
    for (var i = 0; i < parts.length; i++) {
        var owners = await getOwnerHistoryFromEvents('TransferPartOwnership', parts[i])
        console.log("owner here")
        console.log(owners)
        console.log(owners.length)
        if (owners[owners.length -1] == window.accounts[0])
            addItemToList(parts[i], "part-list", carPartListManager)
    }
    
    document.getElementById("part-change-ownership-btn").addEventListener("click", function () {
        console.log("Change Ownership")
        //Get part data from active item on owned list

        var hash_element = document.getElementById("part-change-ownership-btn").getAttribute("name");
        console.log(hash_element);
        if (hash_element != undefined) {
            var to_address = document.getElementById("part-change-ownership-input").value
            if (to_address != "") {
                window.co.methods.changeOwnership(0, hash_element, to_address).send({ from: window.accounts[0], gas: 100000 }, function (error, result) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Changed ownership")
                        //Logic to remove item from owned list
                        // hash_element.parentElement.removeChild(hash_element)
                        clearCarDetails(document.getElementById("part-list-details-1"))
                        document.getElementById("part-list-details-1").style.display = "none"
                        document.getElementById("transfer-result-div").innerHTML="Product Transferred"
                    }
                })
            }

        }
    })
}

//0xaa39f40ab0633ae9a1bbf643addfa3063a89666755ce1395a0742c4baf77e86e
//0x3fa38b7252038199b6c7ebb5b98bad3e97078790994d4ead584251015373eeac
//0x6adc265a4f62967693e499536e46c923506d5e55acf3f5502a15021c06c56a31
//0xaf11934fcff38d5bda623b4d16d18049e6200e19cf9a0da94368e98bc5794c1a
//0xca42aef82d8e832fa9532872772e3dbdf472e4f29790647654bb4df17cf55f7e
//0x73013ace31bfcdbf3810945b74ceb9e1516e09dabd157eb6b5ccdf8f78a5ac99