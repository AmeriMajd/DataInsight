from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React app URL
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
        
        return {
            "status": "success",
            "message": "Scraping started",
            "data": request.dict()
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/")
async def root():
    return {"message": "Welcome to Data Insight Scraper Backend"}
