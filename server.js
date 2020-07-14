const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/',function(req, res){
    const about = {
        avatar_url: "https://i.ibb.co/2SZf9mB/perfilcartton.jpg",
        name: "Davi Bastos",
        role: "Desenvolvedor Web",
        description:"Estudando desenvolvimeto web Front-End e Back-End na stack React Js, React Native e Node Js. Acesse minhas redes sociais para saber mais sobre mim e meus projetos.",
        links: [
            {
                name:"LinkedIn", url:"https://www.linkedin.com/in/davimbastos/"
            },
            {
                name:"Github", url:"https://github.com/davimbastos/"
            },
            {
                name:"Facebook", url:"https://www.facebook.com/davimbastos"
            }
        ]
    }


    return res.render("about", { about })
})

server.get('/front',function(req, res){
    return res.render("front", { items: videos })
})

server.get('/video', function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
        
    })

    if(!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
    
})

server.listen(5000, function(){
    console.log("server is running")
})


