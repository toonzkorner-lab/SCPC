# SCPC Precast Technical Playbook

This document serves as the "Technical Playbook" for the SCPC Precast Next.js application. It is designed to ensure seamless handoffs, smooth future updates, and long-term stability for the custom infrastructure deployed on Hostinger KVM.

## Architecture Overview

* **Framework:** Next.js (App Router)
* **Hosting:** Hostinger KVM VPS
* **Containerization:** Docker & Docker Compose
* **Database:** SQLite (`/data/database.sqlite`)
* **Media Storage:** Local file system (`/public/images`)
* **Automation:** Watchtower (auto-updates Docker containers)

The site is built with a "Set it and Forget it" philosophy, avoiding complex microservices that require constant patching.

## 1. Local Development

To run the site locally for development or testing:

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. The site will be available at `http://localhost:3000`.

### Database
The SQLite database is located at `data/database.sqlite`. It handles both Products/Categories (managed via the Admin panel) and new Leads captured from the contact form. 
*Note: Make sure not to commit the production `database.sqlite` if you pull it down to your local machine.*

## 2. Server Infrastructure (Hostinger KVM)

The application runs inside a Docker container for consistency and isolation.

### Directory Structure on Server
A typical deployment directory (e.g., `/var/www/precast-site`) should look like this:
```
/var/www/precast-site/
├── docker-compose.yml
├── .env.local
├── data/
│   └── database.sqlite
└── public/
    └── images/
```

### Docker Compose
The `docker-compose.yml` file defines two services:
1. `web`: The Next.js application running in standalone mode.
2. `watchtower`: Automates container updates by watching the container registry for new images.

### Persistent Volumes
Two crucial volumes are mounted to the host to ensure data persists across container restarts and rebuilds:
1. `./data:/app/data`: Stores the SQLite database.
2. `./public/images:/app/public/images`: Stores uploaded media files from the admin panel.

## 3. Deployment Workflow

Since the site is hosted on a KVM, updates are pushed via Docker.

### Manual Update (Git Pull Strategy)
If you are deploying from source on the server:
1. SSH into the Hostinger VPS.
2. Navigate to the project directory: `cd /var/www/precast-site`
3. Pull the latest code: `git pull origin main`
4. Rebuild and restart the container:
   ```bash
   docker-compose up -d --build
   ```

### CI/CD Pipeline (Recommended for Watchtower)
If using GitHub Actions or a CI pipeline:
1. Push code to the `main` branch.
2. The CI pipeline builds the Docker image and pushes it to your registry (e.g., Docker Hub or GitHub Container Registry).
3. **Watchtower**, running on the Hostinger KVM, detects the new image, gracefully shuts down the old container, and starts the new one automatically.

## 4. Admin Dashboard & Content Management

The Admin Dashboard is located at `/admin`.

### Authentication
*   **Default Password:** Check the `ADMIN_PASSWORD` variable in `.env.local`. 
*   If you need to change the password, modify the `.env.local` file and restart the container.

### Features
1. **Overview:** View total products, categories, images, and new leads.
2. **System Health:** A widget verifying the status of the Next.js app, SQLite database, and Media storage.
3. **Leads Tracker:** View all inquiries submitted through the front-end Contact form.
4. **Media Library:** Upload and manage images for products and galleries.
5. **Products & Categories:** Full CRUD capabilities to manage the catalog. Data is instantly saved to SQLite.

## 5. Troubleshooting & Maintenance

### Logs
To view the application logs:
```bash
docker logs -f precast-nextjs-web
```

### Database Backups
Because SQLite is a single file, backing up the database is as simple as copying the file. It is recommended to set up a daily cron job on the Hostinger VPS to back up the `/data` folder:
```bash
cp /var/www/precast-site/data/database.sqlite /var/backups/precast-db/database_$(date +%F).sqlite
```

### Media Backups
Similarly, back up the `public/images` directory to ensure no client uploads are lost.

### Performance & SEO
* All images are optimized using Next.js `<Image>` component where possible.
* Metadata is dynamically generated for product and category pages.
* `sitemap.js` automatically queries the SQLite database to generate an up-to-date XML sitemap for Google.
