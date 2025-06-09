import requests
import pandas as pd
from typing import Dict, Any, Tuple

class LLMProvider:
    @staticmethod
    def format_response(csv_content: str) -> Tuple[list, str]:
        # Convert CSV string to DataFrame
        df = pd.read_csv(pd.StringIO(csv_content))
        # Get first 5 rows as list of dicts
        preview_data = df.head().to_dict('records')
        # Full CSV as string
        full_data = df.to_csv(index=False)
        return preview_data, full_data

    @staticmethod
    async def process_with_sambanova(markdown: str, query: str) -> Tuple[list, str]:
        # Implementation for SambaNova API
        # Replace with actual API endpoint and key
        api_url = "https://api.sambanova.com/process"
        headers = {"Authorization": "80008426-34e3-4b9b-b274-fbac822e338e"}
        
        prompt = f"""
        Given the following content:
        {markdown}
        
        Query: {query}
        
        Format the response as CSV rows.
        """
        
        response = requests.post(api_url, json={"prompt": prompt}, headers=headers)
        csv_content = response.json()["result"]
        return LLMProvider.format_response(csv_content)

    @staticmethod
    async def process_with_ollama(markdown: str, query: str) -> Tuple[list, str]:
        # Implementation for Ollama
        api_url = "http://localhost:11434/api/generate"
        
        prompt = f"""
        Given the following content:
        {markdown}
        
        Query: {query}
        
        Format the response as CSV rows.
        """
        
        response = requests.post(api_url, json={"prompt": prompt, "model": "llama2"})
        csv_content = response.json()["response"]
        return LLMProvider.format_response(csv_content)