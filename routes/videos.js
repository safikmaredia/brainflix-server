const express = require('express');
const router = express.Router();
const fs = require('fs');


function readVideos(){
    const videosData = fs.readFileSync('./data/videos.json');
    const parsedVideos = JSON.parse(videosData);
    return parsedVideos;
}
function writeVideo(data){
    const stringifiedVideo = JSON.stringify(data);
    fs.writeFileSync('./data/videos.json', stringifiedVideo);
}

router.get('/', (req, res) => {
    const parsedData = readVideos();
    res.json(parsedData);
});

router.get('/:id', (req, res) =>{
    const videos = readVideos();
    const singleVideo = videos.find((video) => video.id === req.params.id)
    if (!singleVideo){
        return res.status(404).send("Video was not found")
    }
    res.json(singleVideo);
})


router.post('/', (req, res) => {
    const videos = readVideos();
    console.log(req.body);
    const { id, title, description } = req.body;
    // if (!id || !title || !description){
    //     return res.status(400).json({ msg: 'Please fill required field'})
    // } 
    
    const newVideo = {
        id,
        title,
        description,
        image: 'http://localhost:3000/',
        channel:"gerard",
        likes:'10000',
        views: '20000',
        duration:'20:00',
        timestamp: new Date().toLocaleDateString(),
        comments: [{
            "name": "Micheal Lyons",
            "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
            "likes": 0,
            "timestamp": 1628522461000,
          },
          {
            "name": "Gary Wong",
            "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
            "likes": 0,
            "timestamp": 1626359541000,
          },
          {
            "name": "Theodore Duncan",
            "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
            "likes": 0,
            "timestamp": 1626011132000,
          }],
            
}
    videos.push(newVideo);

    writeVideo(videos);

    res.status(201).json(newVideo);
});

module.exports = router;