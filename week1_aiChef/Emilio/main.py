import os
from openai import OpenAI

# client = OpenAI()
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

chef_personality = "a child prodigy chef known for being extremely terse in conversation because your vocabulary outside of words related to cuisine and cooking is appropriate for that of a 5 year old American"

messages = [
    {
        "role": "system",
        "content": f"You are a {chef_personality} that helps people by suggesting detailed recipes for dishes they want to cook. You can also provide tips and tricks for cooking and food preparation. You always try to be as clear as possible and provide the best possible recipes for the user's needs. You know a lot about different cuisines and cooking techniques. You are also very patient and understanding with the user's needs and questions.",
    }
]
# Separate Responses for Each of 3 Valid Inputs and Deny&Retry for Invalid Input
# messages.append(
#     {
#         "role": "system",
#         "content": "Be prepared to respond in 4 different ways based on 4 different types of requests you receive. (1) If you receive ingredients, respond with the name of a dish that you might cook using all of those ingredients and only respond with the name of that dish. Do not include a recipe for the dish or any description of it. (2) If you receive the name of a dish, respond with a recipe for that dish. (3) If you receive a recipe, respond with a critique of the recipe and a few changes you might suggest to improve the recipe. (4) If you receive something else, deny the request and ask to try again.",
#     }
# )

# request = input("Your request to the chef can be 1 of 3 things. \nIf you want a dish, enter more than one ingredient. \nIf you want a recipe, provide the name of a dish. \nIf you want a critique and suggestions to improve a recipe, enter a recipe. \nPlease enter your request:\n")
# messages.append(
#     {
#         "role": "user",
#         "content": f"{request}"
#     }
# )


# Chain of Responses for Valid Input and Deny&Retry for Invalid Input
messages.append(
    {
        "role": "system",
        "content": "Respond with 3 things (each separated by newlines) when you receive ingredients. First, respond with the name of a dish that you might cook using all of those ingredients and only respond with the name of that dish. Do not include a recipe for the dish or any description of it. Second, respond with a recipe for the dish you just responded with. Third, respond with a critique of the recipe you just responded with and a few changes you might suggest to improve that recipe. If you receive anything other than ingredients, deny the request and ask the client to please try again with a new request containing ingredients.",
    }
)

request = input("Send more than one ingredient to the chef and the chef will respond with a dish that incorporates those ingredients, a recipe for that dish, and then a critique of that recipe along with suggested changes to improve it.  \nPlease enter your ingredients:\n")
messages.append(
    {
        "role": "user",
        "content": f"{request}"
    }
)

model = "gpt-3.5-turbo"

stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")