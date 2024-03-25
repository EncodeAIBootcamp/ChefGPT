from openai import OpenAI

client = OpenAI()


while True:
    model = "gpt-3.5-turbo"
    messages = [
        {
            "role": "system",
            "content": "Imagine you are an assistant which can process of one three inputs: "
                       "A list of a dish ingredients, a dish name or a dish recipie. "
                       "If the user passes a word, try to understand if it is a dish name. In this case you should give a recipe for that dish being a fun and energetic Mexican chef that loves spicy food."
                       "If the user passes one or more ingredients, you should suggest a dish name only that can be made with these ingredients."
                       "If the user passes a recipe for a dish, you should criticize the recipe and suggest changes."
                       "If the user passes a something which is not dish ingredients, a dish name or a dish recipie, then you should deny the request and ask to try again."
        }
    ]

    print("\n>>> Tell me something\n")
    user_input = input()
    messages.append(
        {
            "role": "user",
            "content": user_input
        }
    )
    stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
    collected_messages = []
    for chunk in stream:
        chunk_message = chunk.choices[0].delta.content or ""
        print(chunk_message, end="")
        collected_messages.append(chunk_message)
    
    messages.append(
        {
            "role": "system",
            "content": "".join(collected_messages)
        }
    )