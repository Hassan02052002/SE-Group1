import os
import requests
from dotenv import load_dotenv


# Load environment variables from
load_dotenv()

# Retrieve Llama 3 API key from .env
LLAMA3_API_KEY = os.getenv("LLAMA3_API_KEY")





def call_llama3_api(question, context=""):
    url = "https://api.together.xyz/v1/chat/completions"  # Together AI API URL
    
    headers = {
        "Authorization": f"Bearer {LLAMA3_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo",  # Llama 3 Model
        "messages": [
            {"role": "system", "content": "You are an AI travel assistant providing optimized itineraries."},
            {"role": "user", "content": f"Context: {context} {question}"}
        ],
        "temperature": 0.5,
        "max_tokens": 1024
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code} - {response.text}"

# Function to generate a travel itinerary
def generate_nomad_response(destination, budget, preferences):
    user_question = f"Generate a travel plan for {destination} with a budget of {budget}. Preferences: {', '.join(preferences)}."
    
    response = call_llama3_api(user_question)
    return response