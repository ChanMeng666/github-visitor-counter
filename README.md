# GitHub Visitor Counter 🌍

Display visitor flags on your GitHub profile! Show which countries your profile visitors come from.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/github-visitor-counter)

## ✨ Features

- 🚀 Easy to use - just add an image to your README
- 🎨 Multiple themes (default, dark, github, transparent)
- 🔧 Customizable parameters
- 📊 Real-time visitor tracking
- 🌐 Country flag display
- ⚡ Fast with caching

## 📋 Usage

Add this to your GitHub profile README:

```markdown
![](https://github-visitor-counter.vercel.app/api?username=YOUR_USERNAME)
```

Replace `YOUR_USERNAME` with your GitHub username.

## 🎨 Themes

### Default Theme
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng)
```

### Dark Theme
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&theme=dark)
```

### GitHub Theme
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&theme=github)
```

### GitHub Dark Theme
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&theme=github_dark)
```

### Transparent Theme
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&theme=transparent)
```

## ⚙️ Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `username` | GitHub username (required) | - | `chanmeng` |
| `theme` | Color theme | `default` | `dark`, `github`, `transparent` |
| `columns` | Number of flag columns | `2` | `3`, `4`, `5` |
| `maxflags` | Maximum flags to show | `10` | `20`, `50` |
| `label` | Label text above flags | `Visitors` | `Profile Views` |
| `showcount` | Show visitor count | `true` | `false` |
| `size` | Flag size | `medium` | `small`, `large` |
| `bg` | Background color (hex) | theme default | `FF0000` |
| `text` | Text color (hex) | theme default | `00FF00` |
| `border` | Border color (hex) | theme default | `0000FF` |

## 📚 Examples

### Custom Colors
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&bg=FF5733&text=FFFFFF&border=FF5733)
```

### More Flags with Custom Label
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&maxflags=30&columns=5&label=Profile%20Visitors)
```

### Large Flags without Count
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&size=large&showcount=false)
```

### Combined Parameters
```markdown
![](https://github-visitor-counter.vercel.app/api?username=chanmeng&theme=dark&columns=4&maxflags=20&size=small)
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

## 📄 License

MIT License - feel free to use this in your profile!

## 🙏 Credits

- Powered by [Flag Counter](https://flagcounter.com)
- Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

---

Made with ❤️ for the GitHub community