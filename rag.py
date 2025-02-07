import json
import torch.nn.functional as F
from torch import Tensor
from transformers import AutoTokenizer, AutoModel

def split_into_chunks(text, delimiter='.'):
    return text.split(delimiter)

def read_and_process_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        content = file.read()
        chunks = split_into_chunks(content)
        return chunks
    
chunks = read_and_process_file('prompt.txt')
# for index, chunk in enumerate(chunks):            printing all lines to check data in chunks
#     print(f"Chunk {index+1}:", chunk)

def average_pool(last_hidden_states: Tensor,
                 attention_mask: Tensor) -> Tensor:
    last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
    return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

def get_scores(chunks):
    tokenizer = AutoTokenizer.from_pretrained('intfloat/e5-small-v2')
    model = AutoModel.from_pretrained('intfloat/e5-small-v2')

    batch_dict = tokenizer(chunks, max_length=512, padding=True, truncation=True, return_tensors='pt')
    outputs = model(**batch_dict)
    embeddings = average_pool(outputs.last_hidden_state, batch_dict['attention_mask'])
    return embeddings.detach().numpy()  # Convert tensors to numpy arrays
