const {OpenAI} = require('openai')

async function  completionsIA(text, history) {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY
    })

    const item = {
        role: 'user',
        content: text 
    }

    history.push(item)

    const completion = await openai.chat.completions.create({
        messages: history,
        model: "gpt-3.5-turbo",
    });

    history.push(completion.choices[0].message)
    
    return history

}

module.exports = completionsIA