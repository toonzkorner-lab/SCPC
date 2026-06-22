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

def sanitize_filename(filename):
    # decode URL encoding first
    filename = urllib.parse.unquote(filename)
    # replace spaces and weird chars with hyphen
    name, ext = os.path.splitext(filename)
    name = re.sub(r'[^a-zA-Z0-9]+', '-', name).strip('-')
    return f"{name}{ext.lower()}"

def download_image(url):
    try:
        # Some URLs might not have a scheme
        if url.startswith('//'):
            url = 'https:' + url
            
        raw_filename = url.split('/')[-1].split('?')[0]
        if not raw_filename:
            raw_filename = 'image.jpg'
            
        clean_filename = sanitize_filename(raw_filename)
        filepath = os.path.join('public/images/blog', clean_filename)
        
        if not os.path.exists(filepath):
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        return f"/images/blog/{clean_filename}"
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
            
    # Convert to markdown
    markdown = md(str(soup), heading_style="ATX")
    return markdown

def scrape_wp_blogs():
    links = [
        'https://precastbyscpcinc.com/2026/04/15/the-ultimate-guide-to-concrete-pool-coping/',
        'https://precastbyscpcinc.com/2026/03/24/the-ultimate-guide-to-modern-fireplace-surrounds-elevating-your-home-aesthetic/',
        'https://precastbyscpcinc.com/2026/03/11/pier-caps/',
        'https://precastbyscpcinc.com/2026/03/11/the-ultimate-guide-to-planters-elevating-your-landscape-design/',
        'https://precastbyscpcinc.com/2026/03/11/wall-caps-what-they-can-do-for-your-project/',
        'https://precastbyscpcinc.com/2024/11/23/precast-concrete-columns-from-foundation-to-finishing-touches/'
    ]
    
    for url in links:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req).read().decode('utf-8')
            soup = BeautifulSoup(html, 'html.parser')
            
            # Use readability to extract the main content
            from readability import Document
            doc = Document(html)
            title = doc.title()
            # Clean up title if it contains site name
            if "  " in title:
                title = title.split("  ")[0]
            
            # Extract date from URL
            date_match = re.search(r'/(\d{4}/\d{2}/\d{2})/', url)
            date = date_match.group(1).replace('/', '-') if date_match else "2026-01-01"
            
            summary_html = doc.summary()
            
            # Extract images from the FULL html to ensure we don't miss them
            full_soup = BeautifulSoup(html, 'html.parser')
            images_md = []
            seen_images = set()
            cover_image = ""
            for img in full_soup.find_all('img'):
                classes = img.get('class', [])
                if any('wp-image-' in c for c in classes) and not any('icon' in c for c in classes):
                    src = img.get('src')
                    if src and src not in seen_images:
                        seen_images.add(src)
                        if src.startswith('/'):
                            src = urllib.parse.urljoin(url, src)
                        new_src = download_image(src)
                        if not cover_image:
                            cover_image = new_src
                        images_md.append(f"![{title}]({new_src})")
                        
            slug = slugify(title)
            print(f"Saving WP: {title} with {len(images_md)} images, cover: {cover_image}")
            
            md_content = process_html_to_md(summary_html, url)
            
            # Combine images and text
            images_block = "\n\n".join(images_md) + "\n\n" if images_md else ""
            
            cover_line = f'\ncoverImage: "{cover_image}"' if cover_image else ""
            frontmatter = f"---\ntitle: \"{title}\"\ndate: \"{date}\"{cover_line}\n---\n\n"
            with open(f"src/content/blog/{slug}.md", "w", encoding="utf-8") as f:
                f.write(frontmatter + images_block + md_content)
        except Exception as e:
            print(f"Failed to scrape {url}: {e}")

if __name__ == "__main__":
    scrape_wp_blogs()
    print("Done!")
