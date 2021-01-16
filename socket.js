/**
 * 
 * @param {Object} io - Socket.IO object
 * @description Defines all the socket events 
 */
module.exports = function start(io){
    io.on('connection',(socket)=>{
        socket.on("pollAdded",(response)=>{
            // console.log("RES",response);
           io.emit("pollAdded",response);
        })
    });
}