document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Processing...';
  
    const response = await fetch('/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput })
    });
  
    const data = await response.json();
    responseDiv.innerText = data.response;
  });
  