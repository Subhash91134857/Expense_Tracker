


// const openai = new OpenAI({
//     apiKey: "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",
//     dangerouslyAllowBrowser: true
// })


export const generateSmartInsight = async (expenseData) => {
    try {
        const total = expenseData.reduce((sum, exp) => sum + exp.amount, 0);
        const categories = {};

        expenseData.forEach(exp => {
            categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
        });

        const prompt = `
      Analyze this user's expenses:
      Total spent: ₹${total}
      Category breakdown: ${JSON.stringify(categories)}
      
      Give 2 sentences of financial advice or insights.
    `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful financial advisor." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 100
            })
        });

        const data = await response.json();
        console.log(data)
        return data.choices[0].message.content.trim();

    } catch (error) {
        console.error("AI insight Error:", error);
        return "Unable to generate insights right now.";
    }
};
