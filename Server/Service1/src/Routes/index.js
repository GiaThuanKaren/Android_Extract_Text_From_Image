const Routes = function(app,IoSocket){
    app.post("/join",(req,res)=>{
        IoSocket.on("connection",(socket)=>{
            console.log(socket.id);
        })
    })
    app.get("/",(req,res)=>{
        res.send("Hi This Is Init Route");
    })

}

module.exports = Routes