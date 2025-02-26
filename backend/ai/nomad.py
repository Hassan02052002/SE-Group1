import os
import requests
from dotenv import load_dotenv


# Load environment variables from .env
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




# def remove_asterisks(input):
#     return input.replace("**", "")

# # Function to create an OpenAI client instance
# def create_openai_client(api_key):
#     return OpenAI(
#         base_url="https://integrate.api.nvidia.com/v1",
#         api_key=api_key
#     )

# # Function to call OpenAI API
# def call_openai_api(client, question, context):
#     with open("prompt.txt", "rt") as file:
#         prompt = file.read()

#     if context.strip():
#         prompt += f" {context.strip()}"

#     completion = client.chat.completions.create(
#         model="meta/llama3-8b-instruct",
#         messages=[
#             {"role": "system", "content": prompt},
#             {"role": "user", "content": question}
#         ],
#         temperature=0.5,
#         top_p=1,
#         max_tokens=1024,
#         stream=True
#     )

#     response_content = ""
#     for chunk in completion:
#         if chunk.choices[0].delta.content is not None:
#             response_content += chunk.choices[0].delta.content
#     return response_content

# # Function to perform average pooling on last hidden states
# def average_pool(last_hidden_states: Tensor, attention_mask: Tensor) -> Tensor:
#     last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
#     return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

# # Function to get embeddings for texts
# def get_embeddings(texts, tokenizer, model):
#     batch_dict = tokenizer(texts, max_length=512, padding=True, truncation=True, return_tensors='pt')
#     outputs = model(**batch_dict)
#     embeddings = average_pool(outputs.last_hidden_state, batch_dict['attention_mask'])
#     return embeddings.detach().numpy()

# # Function to find most similar chunks based on cosine similarity
# def find_most_similar_chunks(question_embedding, chunk_embeddings, top_k=5):
#     similarities = cosine_similarity(question_embedding, chunk_embeddings)
#     most_similar_indices = similarities.argsort()[0][-top_k:][::-1]
#     return most_similar_indices

# # Function to generate response using embeddings and OpenAI API
# def generate_nomad_response(question):
#     api_key = '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'
#     client = create_openai_client(api_key)

#     tokenizer = AutoTokenizer.from_pretrained('intfloat/e5-small-v2')
#     model = AutoModel.from_pretrained('intfloat/e5-small-v2')

#     with open('prompt.txt', 'r') as f:
#         chunks = f.readlines()

#     question_embedding = get_embeddings([question], tokenizer, model)
#     chunk_embeddings = get_embeddings(chunks, tokenizer, model)
#     most_similar_indices = find_most_similar_chunks(question_embedding, chunk_embeddings)

#     context_text = " ".join([chunks[i] for i in most_similar_indices])
#     context_text += " " + question

#     answer = call_openai_api(client, question, context_text)
#     return remove_asterisks(answer)
