const { default: mongoose } = require("mongoose");
const connection = require("../config/connection");

//require models
const User = require("../models/User");
const Thought = require("../models/Thought"); //this includes the subdocument to reactions

// data
const users = [
    {
        username: "chungus",
        email: 'chungus@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "Memology101",
        email: 'memology101@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "SCMJreviews",
        email: 'somecallmejohnny@example.org',
        password: "password123",
        friends: []
    },
    {
        username: "LarBear",
        email: 'LCCountyPD@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "locLibrary_official",
        email: 'localLibrary@example.org',
        password: "password123",
        friends: []
    },
    {
        username: "Haru_Shiba",
        email: 'ShibazRcute21@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "LinuxRulz99",
        email: 'LTTlinus@aol.com',
        password: "password123",
        friends: []
    },
    {
        username: "Project_Trees",
        email: 'Mrbeast@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "hmantilla",
        email: 'hmantilla1691@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "ANGRY_VIDEO_GAME_NERD",
        email: 'avgn84@yahoo.com',
        password: "password123",
        friends: []
    },
    {
        username: "SnoopDogg",
        email: 'puppies40@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "OceanNails65",
        email: 'OceanNails@hotmail.com',
        password: "password123",
        friends: []
    }
];

const thoughts = [
    {
        thoughtText: "Happy Birthday to my bro. Hope you have a great one",
        username: "chungus",
        reactions: []
    },
    {
        thoughtText: "So happy tomorrow is Friday!",
        username: "hmantilla",
        reactions: []
    },
    {
        thoughtText: "I wish I had more time in the day for this assignment!!",
        username: "Migeru27",
        reactions: []
    }
];

const reactions = [
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "That's a true statement!",
        username: "SnoopDogg"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "I think you're nice today.",
        username: "OceanNails65"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "You should contact me directly to invest in Bitcoin!",
        username: "Project_Trees"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Yeah man, me too but I'd take a longer nap",
        username: "Haru_Shiba"
    }
];

connection.on('error', (err) => err);

connection.once("open", async () => {
    await User.deleteMany({})
    await Thought.deleteMany({})

   await User.insertMany(users)

   for(let i = 0; i < thoughts.length; i++){
    const newThought = await Thought.create({
        thoughtText: thoughts[i].thoughtText,
        username: thoughts[i].username,
        reactions: reactions[i]
    })
    await User.findOneAndUpdate({username: thoughts[i].username},{
        $push : {thoughts: newThought.id}
    })
   }


   console.table(users)
   console.table(thoughts)
   console.table(reactions)
   console.log("Database is now seeded!")
   process.exit(1)
})