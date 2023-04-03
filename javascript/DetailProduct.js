let maxAvailableProduct = 22;
function increaseQuantityProduct(){
    let oldQuantity = document.getElementById("quantityProductPurchase").value;
    if(oldQuantity==22){
        return;
    }
    document.getElementById("quantityProductPurchase").value = parseInt(oldQuantity)+1;
}
function decreaseQuantityProduct(){
    let oldQuantity = document.getElementById("quantityProductPurchase").value;
    if(oldQuantity==0){
        return;
    }
    document.getElementById("quantityProductPurchase").value = parseInt(oldQuantity)-1;
}
function changeQuantityProduct(){
    let quantity = parseInt(document.getElementById("quantityProductPurchase").value);
    if(quantity>maxAvailableProduct){
        document.getElementById("quantityProductPurchase").value = maxAvailableProduct;
    }
    if(quantity<0){
        document.getElementById("quantityProductPurchase").value = 0;
    }
}
const sleep = ms => new Promise(res => setTimeout(res, ms));
async function showAlertSuccess(){
    document.getElementById("alert_success").style.display = 'block';
    await sleep(2600);
    document.getElementById("alert_success").style.display = 'none';
}

function overlayDescription(){
    document.getElementById("overlay_detail_description").style.display = 'none';
    document.getElementById("description_detail").style.height = 'fit-content';
}