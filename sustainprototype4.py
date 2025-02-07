import json
import torch
from rag import read_and_process_file, get_scores
from sklearn.metrics.pairwise import cosine_similarity
import torch.nn.functional as F
from torch import Tensor
from transformers import AutoTokenizer, AutoModel
from main_script import remove_asterisks
import requests
from openai import OpenAI
import pandas as pd

# Function to create an OpenAI client instance
def create_openai_client(api_key):
    return OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=api_key
    )

# Function to call OpenAI API
def call_openai_api(client, question, context):
    with open("prompt.txt", "rt") as file:
        prompt = file.read()

    # Append the context of the current conversation to the prompt
    if context.strip():
        prompt += f" {context.strip()}"

    completion = client.chat.completions.create(
        model="meta/llama3-8b-instruct",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": question}
        ],
        temperature=0.5,
        top_p=1,
        max_tokens=1024,
        stream=True
    )

    response_content = ""
    for chunk in completion:
        if chunk.choices[0].delta.content is not None:
            response_content += chunk.choices[0].delta.content
    return response_content



# Function to perform average pooling on last hidden states
def average_pool(last_hidden_states: Tensor, attention_mask: Tensor) -> Tensor:
    last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
    return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

# Function to get embeddings for texts
def get_embeddings(texts, tokenizer, model):
    batch_dict = tokenizer(texts, max_length=512, padding=True, truncation=True, return_tensors='pt')
    outputs = model(**batch_dict)
    embeddings = average_pool(outputs.last_hidden_state, batch_dict['attention_mask'])
    return embeddings.detach().numpy()  # Convert tensors to numpy arrays

# Function to find most similar chunks based on cosine similarity
def find_most_similar_chunks(question_embedding, chunk_embeddings, top_k=5):
    similarities = cosine_similarity(question_embedding, chunk_embeddings)
    most_similar_indices = similarities.argsort()[0][-top_k:][::-1]
    return most_similar_indices

# Function to generate response using embeddings and OpenAI API
def main():
    api_key = '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'
    client = create_openai_client(api_key)

    tokenizer = AutoTokenizer.from_pretrained('intfloat/e5-small-v2')
    model = AutoModel.from_pretrained('intfloat/e5-small-v2')

    chunks = read_and_process_file('prompt.txt')
    context = []
    for i in range(20):
        print("")
        user_help = "Your response must be quite optimized and do not add extra information, be specific according to question and give plan in list form, keep it brief with prices."
        user_question = user_help + input(f"Please enter question {i+1}: ")
        response = generate_response(client, user_question, chunks, tokenizer, model, context)
        final_response = remove_asterisks(response)
        context.append(user_question)
        context.append(final_response)
        print("")
        print(f"Response to question {i+1}:", final_response)

def generate_response(client, question, chunks, tokenizer, model, context):
    question_embedding = get_embeddings([question], tokenizer, model)
    chunk_embeddings = get_embeddings(chunks, tokenizer, model)
    most_similar_indices = find_most_similar_chunks(question_embedding, chunk_embeddings)
    context_text = " ".join(context)
    context_text += " " + question
    answer = call_openai_api(client, question, context_text)
    return answer

if __name__ == "__main__":
    main()