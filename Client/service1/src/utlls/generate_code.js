export const Generate_code=function(){
    let getcodefromnow = `${Date.now()}`;
    console.log(getcodefromnow.length-5);
    let index = getcodefromnow.length-5;
    console.log(getcodefromnow.substring(index));
    return getcodefromnow.substring(index)
}