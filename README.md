# Fred API plot

## Why Next.js?

My initial approach for this project was to initialize with Vite.js. But it turns out that Fred API doesn't allow requests from the browser and throws a CORS error which requires us to proxy the request through a server. Next.js makes it easy for us to do so without the hassle of setting us the server ourselves and deploy it.

Another Plus point of using Next.js that it allows us not to expose the Fred API key in the network tab.

## Setting up the project locally

1. Run ``` git clone https://github.com/Ahmad-Zaaza/fred-api-plot.git ```
2. Run ``` npm install ```
3. Create ``` .env.local ``` file and add ``` API_KEY=<YOUR_API_KEY> ```
4. Run ``` npm run dev ```
