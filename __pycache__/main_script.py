import requests
import json


def remove_asterisks(input):
    return input.replace("**", "")

# Define your API key and model name
AWANLLM_API_KEY = '253aa059-346d-44c5-ade2-5cb31fe5a167'
MODEL_NAME = 'Meta-Llama-3-8B-Instruct'

# Define the URL for the API endpoint
url = "https://api.awanllm.com/v1/chat/completions"

# Define the payload
payload = json.dumps({
  "model": MODEL_NAME,
  "messages": [
    {
      "role": "user",
      "content": "Who is Obama?"
    }
  ]
})

# Define the headers
headers = {
  'Content-Type': 'application/json',
  'Authorization': f"Bearer {AWANLLM_API_KEY}"
}

# Make the request
response = requests.post(url, headers=headers, data=payload)

# Print the response content
# response_data = response.json()
# message_content = response_data['choices'][0]['message']['content']

# # Print the clean text
# message_final = remove_asterisks(message_content)
# print(" ")
# print(f"Response from assistant: {message_final}")