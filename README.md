# Portfolio Aggregator

A simple, client-side web application for aggregating your investment portfolio across multiple brokers. No backend, no storage - everything runs in your browser.

## Features

- Upload CSV exports from **Trading 212** and **Interactive Brokers (IBKR)**
- Add manual cash balances from bank accounts
- View aggregated portfolio with total net worth
- See cash vs stocks breakdown with percentages
- Browse all holdings in a sortable table
- Automatic grouping of duplicate symbols across brokers

## Getting Started

1. Open `index.html` in your web browser
2. Export your portfolio CSVs from your brokers (see instructions below)
3. Upload the CSV files
4. Add any manual cash balances
5. View your complete portfolio

## How to Export CSVs

### Trading 212

1. Log in to Trading 212 (web or mobile app)
2. Go to **History** → **Statements**
3. Select **Portfolio Statement** or **Export to CSV**
4. Choose the current date or most recent period
5. Download the CSV file

**Required columns:** The CSV should contain columns for:
- Ticker/Symbol
- Name
- Quantity (or No. of Shares)
- Value (in GBP)

### Interactive Brokers (IBKR)

#### Option 1: Flex Query (Recommended)

1. Log in to **Client Portal**
2. Go to **Performance & Reports** → **Flex Queries**
3. Create a new query or use an existing one with:
   - **Sections:** Open Positions, Cash Report
   - **Columns:** Symbol, Description, Quantity, Value/Position Value
4. Run the query and download as CSV

#### Option 2: Activity Statement

1. Log in to **Client Portal**
2. Go to **Performance & Reports** → **Statements**
3. Select **Activity** or **Default**
4. Choose **CSV** format
5. Select the current period
6. Download the statement

**Required columns:** The CSV should contain:
- Symbol
- Description/Name
- Quantity
- Value or Position Value

**Note:** IBKR CSVs may contain multiple sections. The app will parse positions and cash balances automatically.

### Currency Note

This app assumes all values are in **GBP**. If your IBKR account is in USD or another currency, you may need to:
- Manually convert values before uploading, or
- Use the multi-currency report feature if available

A proper FX conversion feature is planned for future updates.

## Manual Cash Entry

Use the "Manual Cash Balances" section to add cash holdings from:
- Bank current accounts
- Savings accounts
- Cash ISAs
- Premium Bonds
- Any other cash not included in broker exports

## Privacy & Security

- **100% client-side** - No data is sent to any server
- **LocalStorage persistence** - Your data is saved in your browser and persists across sessions
- **No tracking** - Your portfolio data stays on your device
- **Clear All Data** - Use the "Clear All Data" button in the header to reset everything

## Troubleshooting

### "Expected columns not found" error

Your CSV format may be different from expected. Check that your file contains:
- Trading 212: Ticker, Value columns
- IBKR: Symbol, Value columns

The app uses fuzzy matching, but very old or customized export formats may not work.

### Holdings not showing up

- Ensure the CSV has a header row
- Check that value columns contain numbers (not just dashes or zeros)
- Empty rows are automatically skipped

### Same stock showing twice

This shouldn't happen - the app groups duplicate symbols. If you see duplicates:
- Check if they have different tickers (e.g., VUSA vs VUSA.L)
- The app treats different symbols as separate holdings

## Technical Details

- **Single HTML file** - No build process required
- **Vue 3** - Reactive UI framework (via CDN)
- **Tailwind CSS** - Styling (via CDN)
- **Papa Parse** - CSV parsing (via CDN)

## Limitations

- Browser-only storage (data saved in localStorage, not synced across devices)
- No FX conversion (assumes GBP)
- No historical tracking
- No automatic updates (manual CSV uploads required)

## Future Enhancements

Possible additions:
- Multi-currency support with live FX rates
- Import from more brokers (Vanguard, Hargreaves Lansdown, etc.)
- Historical performance tracking
- Dividend tracking
- Export aggregated portfolio to CSV
- Cloud sync across devices

## License

Free to use and modify for personal use.
