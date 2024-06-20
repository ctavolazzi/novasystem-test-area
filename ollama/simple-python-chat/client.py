import json
import requests

# NOTE: ollama must be running for this to work, start the ollama app or run `ollama serve`
model = "llama3"  # TODO: update this for whatever model you wish to use


def chat(messages):
    with requests.post(
        "http://localhost:11434/api/chat",
        json={"model": model, "messages": messages, "stream": True},
        stream=True,
    ) as r:
        if r.status_code != 200:
            print("Error:", r.status_code, r.content)
            return {"role": "system", "content": "Error: " + r.content.decode()}
        
        buffer = ""
        content_parts = []
        for line in r.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                buffer += decoded_line
                while True:
                    try:
                        # Try to parse the buffer as JSON
                        response_json, index = json.JSONDecoder().raw_decode(buffer)
                        # Extract the "content" part
                        content = response_json.get("message", {}).get("content", "")
                        if content:
                            content_parts.append(content.strip())
                        buffer = buffer[index:].lstrip()  # Remove the parsed JSON from the buffer
                    except json.JSONDecodeError:
                        # If JSON is not complete, break the loop and wait for more data
                        break
        
        if buffer:
            try:
                # Attempt to parse any remaining data in the buffer
                response_json = json.loads(buffer)
                content = response_json.get("message", {}).get("content", "")
                if content:
                    content_parts.append(content.strip())
            except json.JSONDecodeError as e:
                print("JSON decode error:", e)
                return {"role": "system", "content": "Error: " + str(e)}
        
        full_content = " ".join(content_parts)
        print("Response content:", full_content)
        return {"role": "assistant", "content": full_content}


def main():
    messages = []

    while True:
        user_input = input("Enter a prompt: ")
        if not user_input:
            exit()
        print()
        messages.append({"role": "user", "content": user_input})
        message = chat(messages)
        messages.append(message)
        print("\n\n")


if __name__ == "__main__":
    main()