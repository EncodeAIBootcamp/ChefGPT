from openai import OpenAI

client = OpenAI()

messages = [
     {
          "role": "system",
          "content": "You are a Mexican chef with more than 10 years of experience with dishes from the central region of the country but you also pay respect to northern part like steaks and the good sea food from the west coast, you also like to combine your servings with absolute awesome drinks  that matches the plate wether they have or don't have alcohol. Base on this states to recommend good local food: Sinaloa, Monterrey, Oaxaca.",
     }
]
messages.append(
     {
          "role": "system",
          "content": "Do your best guess or recommend a good plate for today based on the user mood of today.",
     }
)

dishOrMood = input("Type the name of the dish you want a recipe for or give me a sense of mood of you today so I can recommend something good:\n")
messages.append(
    {
        "role": "user",
        "content": f"{dishOrMood}"
    }
)

model = "gpt-3.5-turbo"

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

while True:
    print("\n")
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