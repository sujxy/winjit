import torch
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from torch.utils.data import DataLoader, TensorDataset
import json
import warnings

# Step 1: Fine-tuning the BERT model on the teacher dataset

# Load a pre-trained BERT model and tokenizer
model_name = "bert-base-uncased"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(
    model_name, num_labels=2
)  # Adjust num_labels for your task

# Load the teacher JSON dataset with utf-8-sig encoding
with open("teacher.json", "r", encoding="utf-8-sig") as json_file:
    teacher_dataset = json.load(json_file)

# Tokenize your teacher dataset
teacher_questions = [entry["question"] for entry in teacher_dataset]
teacher_answers = [entry["answer"] for entry in teacher_dataset]
teacher_labels = [1, 0]  # You may have labels in your dataset

encoding = tokenizer(
    teacher_questions,
    teacher_answers,
    padding=True,
    truncation=True,
    return_tensors="pt",
)

# Create a DataLoader for the teacher dataset with a smaller batch size
teacher_dataloader = DataLoader(teacher_dataset, batch_size=1, shuffle=True)

# Define loss and optimizer
loss_fn = torch.nn.CrossEntropyLoss()
optimizer = AdamW(model.parameters(), lr=1e-5)

# Fine-tuning the model for a reduced number of epochs
model.train()
for epoch in range(1):  # Reduced the number of epochs
    for batch in teacher_dataloader:
        input_ids, attention_mask, target = batch

        optimizer.zero_grad()
        output = model(input_ids, attention_mask=attention_mask).logits
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()

# Save the fine-tuned model
model.save_pretrained("fine_tuned_model")

# Step 2: Using the fine-tuned model to evaluate the student dataset

# Load the fine-tuned BERT model and tokenizer


def preprocess_pdf(pdf_path):
    # Extract text from the PDF
    text = extract_text(pdf_path)
    # Add any additional preprocessing steps if needed
    return text


def contextual_search(query, text):
    # Tokenize the query and document using RoBERTa tokenizer
    tokenizer = RobertaTokenizer.from_pretrained("roberta-base")
    inputs = tokenizer(
        query, text, return_tensors="pt", max_length=256, truncation=True
    )

    # Load pre-trained RoBERTa model for question answering
    model = RobertaForQuestionAnswering.from_pretrained("roberta-base")

    # Get the answer from the model
    outputs = model(**inputs)
    start_scores, end_scores = outputs.start_logits, outputs.end_logits
    start_index = torch.argmax(start_scores)
    end_index = torch.argmax(end_scores) + 1

    # Extract the answer from the text
    answer_tokens = inputs["input_ids"][0][start_index:end_index]
    answer = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(answer_tokens)
    )

    # Print the full answer
    print("Full Answer:", answer)

    # Handle empty answer
    if answer.strip() == "":
        return "Chatbot: I couldn't find an answer to your question."

    return answer


def chatbot():
    # Example PDF file
    pdf_path = "rbi.pdf"

    # Preprocess PDF
    pdf_text = preprocess_pdf(pdf_path)

    # Suppress the warning about uninitialized weights
    warnings.filterwarnings(
        "ignore",
        message="Some weights of RobertaForQuestionAnswering were not initialized from the model checkpoint",
    )

    print(
        "Chatbot: Hi! I'm here to help you with information from the document. Ask me anything."
    )

    while True:
        # User input
        user_query = input("You: ")

        # Check if the user wants to exit
        if user_query.lower() in ["exit", "quit", "bye"]:
            print("Chatbot: Goodbye!")
            break

        # Perform contextual search
        result = contextual_search(user_query, pdf_text)

        print(result)


if __name__ == "__main__":
    chatbot()
