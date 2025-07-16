# GitHub Visitor Counter 🌍

Display visitor flags on your GitHub profile! Show which countries your profile visitors come from.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ChanMeng666/github-visitor-counter)

## ✨ Features

- 🚀 Easy to use - just add an image to your README
- 🎨 Multiple themes (default, dark, github, transparent)
- 🔧 Customizable parameters
- 📊 Real-time visitor tracking
- 🌐 Country flag display
- ⚡ Fast with caching

## 📋 Quick Start

### Option 1: Use the Configuration Tool
Visit [https://github-visitor-counter-zeta.vercel.app](https://github-visitor-counter-zeta.vercel.app) to customize your counter with a live preview.

### Option 2: Manual Setup
Add this to your GitHub profile README:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
```

Replace `YOUR_USERNAME` with your GitHub username.

**Live Example:**

![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666)

## 🎨 Themes

### Default Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666)

### Dark Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark)

### GitHub Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github)

### GitHub Dark Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark)

### Transparent Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=transparent)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=transparent)

## ⚙️ Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `username` | GitHub username (required) | - | `ChanMeng666` |
| `theme` | Color theme | `default` | `dark`, `github`, `transparent` |
| `flagsfrom` | Show flags from specific country | `all` | `us`, `ca` |
| `columns` | Number of flag columns (1-8) | `2` | `3`, `4`, `5` |
| `maxflags` | Maximum flags to show (1-250) | `10` | `20`, `50`, `100` |
| `label` | Label text above flags | `Visitors` | `none`, `Profile Views` |
| `showcount` | Show visitor count | `true` | `false` |
| `visitortype` | Show visitors as | `number` | `percentage` |
| `showlabels` | Show country labels | `false` | `true` |
| `size` | Flag size | `medium` | `small`, `large` |
| `bg` | Background color (hex) | theme default | `577EFF` |
| `text` | Text color (hex) | theme default | `00FF00` |
| `border` | Border color (hex) | theme default | `B74BCC` |

## 📚 Examples

### Custom Colors
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&bg=FF5733&text=FFFFFF&border=FF5733)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&bg=FF5733&text=FFFFFF&border=FF5733)

### More Flags with Custom Label
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&maxflags=30&columns=5&label=Profile%20Visitors)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&maxflags=30&columns=5&label=Profile%20Visitors)

### Large Flags without Count
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=large&showcount=false)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=large&showcount=false)

### Small Flags with More Columns
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=small&columns=4)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=small&columns=4)

### Combined Parameters
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark&columns=4&maxflags=20&size=small)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark&columns=4&maxflags=20&size=small)

### Show US Visitors Only
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&flagsfrom=us)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&flagsfrom=us)

### Show Percentages with Flag Labels
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&visitortype=percentage&showlabels=true)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&visitortype=percentage&showlabels=true)

### No Label with Maximum Flags
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=none&maxflags=50&columns=8&size=small)
```
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=none&maxflags=50&columns=8&size=small)

## 🎯 Use Cases

### Minimal Setup
Just want to quickly add a visitor counter? Use the default settings:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
```

### Professional Profile
For a clean, professional look:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&theme=github&columns=3&maxflags=15)
```

### Dark Mode Friendly
Perfect for dark-themed profiles:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&theme=dark&columns=4)
```

### Maximalist Approach
Show as many flags as possible:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&maxflags=250&columns=8&size=small)
```

## 🚀 Deploy Your Own

1. Click the deploy button above
2. Clone this repository
3. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Deploy to production
npm run deploy
```

## 📝 How It Works

1. When someone visits your GitHub profile, the image loads from our API
2. The API generates a unique identifier based on your username
3. Flag Counter tracks the visitor's country
4. The service returns an image showing all visitor flags

## 🔐 Privacy

- No personal data is collected
- Only country information is tracked via Flag Counter
- Each GitHub username gets a unique, anonymous identifier

## 📄 License

MIT License - feel free to use this in your profile!

## 🙏 Credits

- Powered by [Flag Counter](https://flagcounter.com)
- Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

## 💡 Tips

1. **First Visit**: You'll see your own country's flag first
2. **Caching**: Updates may take up to 1 hour to appear
3. **Max Flags**: Flag Counter limits the total number of unique countries
4. **Custom Styling**: Use theme parameters to match your README style
5. **Independent Counters**: Each unique parameter combination creates its own visitor counter. If you want consistent visitor data across different themes, use the same parameters

---

Made with ❤️ for the GitHub community