from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from io import StringIO, BytesIO
import base64
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
        
        # 5. Prepare data for response
        preview_data = df.head().to_dict(orient="records")
        json_data = df.to_json(orient="records")

        # For Excel, write to a BytesIO buffer and then base64 encode
        excel_io = BytesIO()
        with pd.ExcelWriter(excel_io, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Sheet1')
        excel_io.seek(0)
        excel_base64 = base64.b64encode(excel_io.read()).decode('utf-8')

        return {
            "status": "success",
            "message": "Scraping completed",
            "data": {
                "preview": preview_data,
                "csv": csv_content,
                "json": json_data,
                "excel": excel_base64  # Send as base64 string
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Welcome to Data Insight Scraper Backend"}
