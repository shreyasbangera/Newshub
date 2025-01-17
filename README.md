## Running the Docker Container

1. **Build the Docker image**:  
   `docker build -t newshub .`

2. **Run the Docker container**:  
   `docker run --env-file .env -p 3000:3000 newshub`

3. **Access the app** in the browser:  
   `http://localhost:3000`
