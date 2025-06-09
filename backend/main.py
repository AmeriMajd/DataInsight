from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from io import StringIO
from utils.scraper import WebScraper
from utils.llm_provider import LLMProvider

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScraperRequest(BaseModel):
    provider: str
    model: str
    method: str
    url: str
    query: str

@app.post("/scrape")
async def scrape(request: ScraperRequest):
    try:
        # 1. Fetch content based on method
        scraper = WebScraper()
        if request.method == "Selenium":
            html_content = scraper.selenium_scrape(request.url)
        else:  # Crawl4AI
            html_content = scraper.crawl4ai_scrape(request.url)
        
        # 2. Convert to Markdown
        markdown_content = scraper.html_to_markdown(html_content)
        
        # 3. Process with LLM
        llm_provider = LLMProvider()
        if request.provider == "SambaNova":
            csv_content = await llm_provider.process_with_sambanova(
                markdown_content, 
                request.query
            )
        else:  # Ollama
            csv_content = await llm_provider.process_with_ollama(
                markdown_content, 
                request.query
            )
        
        # 4. Convert to DataFrame
        df = pd.read_csv(StringIO(csv_content))
        
        return {
            "status": "success",
            "message": "Scraping completed",
            "data": {
                "csv": csv_content,
                "json": df.to_json(orient="records"),
                "excel": df.to_excel()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Welcome to Data Insight Scraper Backend"}
