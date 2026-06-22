import os
import re
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
from markdownify import markdownify as md

os.makedirs('src/content/blog', exist_ok=True)
os.makedirs('public/images/blog', exist_ok=True)

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def download_image(url):
    try:
        filename = url.split('/')[-1].split('?')[0]
        if not filename:
            filename = 'image.jpg'
        filepath = os.path.join('public/images/blog', filename)
        if not os.path.exists(filepath):
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        return f"/images/blog/{filename}"
    except Exception as e:
        print(f"Failed to download image {url}: {e}")
        return url

def process_html_to_md(html, base_url):
    soup = BeautifulSoup(html, 'html.parser')
    for img in soup.find_all('img'):
        src = img.get('src')
        if src:
            if src.startswith('/'):
                src = urllib.parse.urljoin(base_url, src)
            new_src = download_image(src)
            img['src'] = new_src
    
    # Custom markdownify to handle specific tags if needed
    markdown = md(str(soup), heading_style="ATX")
    return markdown

def scrape_blogger():
    print("Scraping Blogger...")
    blogger_url = 'https://precastbyscpcinc.blogspot.com/'
    req = urllib.request.Request(blogger_url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    posts = soup.find_all('div', class_='post')
    for post in posts:
        title_elem = post.find('h3', class_='post-title')
        if not title_elem:
            continue
        title = title_elem.text.strip()
        body_elem = post.find('div', class_='post-body')
        if not body_elem:
            continue
        
        slug = slugify(title)
        print(f"Saving: {title}")
        
        md_content = process_html_to_md(str(body_elem), blogger_url)
        
        # We don't have exact dates, just use a placeholder
        frontmatter = f"---\ntitle: \"{title}\"\ndate: \"2026-03-01\"\n---\n\n"
        with open(f"src/content/blog/{slug}.md", "w", encoding="utf-8") as f:
            f.write(frontmatter + md_content)

def scrape_wp():
    print("Scraping WordPress...")
    # List of known links from the previous check
    links = [
        'https://precastbyscpcinc.com/bug-holes/',
        'https://precastbyscpcinc.com/precast-concrete-columns/',
        'https://precastbyscpcinc.com/precast-concrete-bollards/',
        'https://precastbyscpcinc.com/testimonial-from-eleven-western-builders-inc/',
        'https://precastbyscpcinc.com/testimonial-gcs-like-precast/',
        'https://precastbyscpcinc.com/testimonial-la-mesa-police-department/'
    ]
    
    for url in links:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req).read().decode('utf-8')
            soup = BeautifulSoup(html, 'html.parser')
            
            title_elem = soup.find('h1', class_='entry-title')
            if not title_elem:
                title_elem = soup.find('h1')
            title = title_elem.text.strip() if title_elem else url.split('/')[-2].replace('-', ' ').title()
            
            body_elem = soup.find('div', class_='entry-content')
            if not body_elem:
                body_elem = soup.find('article')
            
            if not body_elem:
                print(f"Could not find body for {url}")
                continue
            
            slug = slugify(title)
            print(f"Saving: {title}")
            
            md_content = process_html_to_md(str(body_elem), url)
            
            frontmatter = f"---\ntitle: \"{title}\"\ndate: \"2024-01-01\"\n---\n\n"
            with open(f"src/content/blog/{slug}.md", "w", encoding="utf-8") as f:
                f.write(frontmatter + md_content)
        except Exception as e:
            print(f"Failed to scrape {url}: {e}")

if __name__ == "__main__":
    scrape_blogger()
    scrape_wp()
    print("Done!")
