const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");

const chats = [];

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/messages", (req, res) => {
    console.log(req.body);

    const pin = req.body.pin;
    const message = req.body.message;

    /////////////// SOLUTION FOR PART 6 ///////////////
    // for(let i = 0; i < chats.length; i++) {
    //     let pinExists = bcryptjs.compareSync(pin, chats[i].pin);

    //     if(pinExists) {
    //         chats[i].messages.push(message);
    //         let messagesToReturn = {...chats[i]};
    //         delete messagesToReturn.pinHash;
    //         res.status(200).send(messagesToReturn);
    //         return;
    //     }
    // }

    const salt = bcryptjs.genSaltSync(5);
    const hashedPin = bcryptjs.hashSync(pin, salt);
    
    console.log(salt);
    console.log(hashedPin);

    let newMessageObject = {
        pin: hashedPin,
        messages: [message]
    }

    chats.push(newMessageObject);

    /////////////// SOLUTION FOR PART 5 ///////////////
    // let messagesToReturn = {...newMessageObject};
    // delete messagesToReturn.pin;
    // res.status(200).send(messagesToReturn);

    res.status(200).send(newMessageObject); // NOTE: Once you get to Part 5, comment out this line of code otherwise you will get an error!
});

app.listen(4004, () => console.log("Running on port 4004"));
