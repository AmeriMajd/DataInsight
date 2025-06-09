from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import requests
import html2text
import pandas as pd

class WebScraper:
    @staticmethod
    def selenium_scrape(url: str):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        driver = webdriver.Chrome(options=chrome_options)
        try:
            driver.get(url)
            content = driver.page_source
            return content
        finally:
            driver.quit()
    
    @staticmethod
    def crawl4ai_scrape(url: str):
        response = requests.get(url)
        return response.text

    @staticmethod
    def html_to_markdown(html_content: str) -> str:
        converter = html2text.HTML2Text()
        converter.ignore_links = False
        return converter.handle(html_content)