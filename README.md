## API and App Setup

### Running the OMDB API Locally

The OMDB API is a public API and does not require local setup. However, you need an API key to fetch data. Follow these steps to configure your API key:

1. **Obtain an API Key**:
   - Visit the [OMDB API website](http://www.omdbapi.com/) and sign up to get your API key.

2. **Configure Your API Key**:
   - Open the `HomeStore.js` file in your project.
   - Locate the `apiKey` variable and replace it with your own API key:
     ```javascript
     const apiKey = "your-api-key-here";
     ```
   - Save the file after updating the key.

### Running the App Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/movie-search-app.git
