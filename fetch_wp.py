import urllib.request
import re

url = 'https://precastbyscpcinc.com/scpc-blog/'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'href=[\'\"](https://precastbyscpcinc.com/[^\'\"]+)[\'\"]', html)
    
    valid = set()
    for l in links:
        if 'wp-content' not in l and '/category/' not in l and '/tag/' not in l and '/scpc-blog/' not in l and l != 'https://precastbyscpcinc.com/':
            valid.add(l)
    print("WP links:", list(valid)[:20])
except Exception as e:
    print(e)
