require('./connection')

const User = require('./models/User')

async function createUser(){
    const userOne = new User({
        nickname: 'marco',
       
    })
    await userOne.save();

    const userTwo = new User({
        nickname: 'matias',
    })
    await userTwo.save();
}

createUser();