# Vinyl Collection App

A modern web application for managing your vinyl record collection. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Search vinyl records using the Discogs API
- View detailed information about each record
- Track your collection with condition, purchase date, and price
- Beautiful and responsive UI
- Fast and modern web experience

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Discogs API token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vinyl-collection.git
cd vinyl-collection
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Discogs API token:
```
NEXT_PUBLIC_DISCOGS_TOKEN=your_token_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Discogs API](https://www.discogs.com/developers/) - Vinyl record database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 