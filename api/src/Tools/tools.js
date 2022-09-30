function generatorUuid(){
    let ahora = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{
        let aleatorio = (ahora + Math.random()*16)%16 |0;
        ahora = Math.floor(ahora/16);
        return (c == 'x'? aleatorio : (aleatorio & 0x3 | 0x8).toString(16));
    });
    return uuid
}




module.exports = {
    uuid:generatorUuid
}