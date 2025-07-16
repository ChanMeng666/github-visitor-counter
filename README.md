# GitHub Visitor Counter 🌍

![GitHub Visitor Counter Demo](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark&columns=4&maxflags=12)

A simple and elegant visitor counter for your GitHub profile that displays country flags of your visitors. Track and showcase where your GitHub profile visitors come from with customizable themes and layouts.

## 🚀 Quick Start

Add this line to your GitHub profile README:

```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🎨 Live Demo & Configuration Tool

Visit our [Interactive Configuration Tool](https://github-visitor-counter-zeta.vercel.app) to customize your counter with live preview.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Parameters](#parameters)
- [Examples](#examples)
- [Themes](#themes)
- [API Reference](#api-reference)
- [Self-Hosting](#self-hosting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🌐 Display visitor country flags
- 🎨 Multiple built-in themes
- 📊 Show visitor count or percentage
- 🎯 Customizable layout (1-8 columns)
- 🏷️ Custom labels
- 🎨 Custom colors
- 📱 Responsive design
- ⚡ Fast and reliable
- 🔒 Privacy-focused (no personal data stored)

## 🛠️ Installation

### Basic Usage

1. Copy the markdown code:
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
```

2. Paste it into your GitHub profile README.md

3. Replace `YOUR_USERNAME` with your GitHub username

### With HTML (for more control)

```html
<div align="center">
  <img src="https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME" alt="Visitor Counter">
</div>
```

## 📝 Parameters

All parameters are optional except `username`.

| Parameter | Type | Default | Description | Values |
|-----------|------|---------|-------------|--------|
| `username` | string | **required** | Your GitHub username | Any valid GitHub username |
| `theme` | string | `default` | Pre-defined color themes | `default`, `dark`, `github`, `github_dark`, `transparent` |
| `columns` | number | `2` | Number of flag columns | `1-8` |
| `maxflags` | number | `10` | Maximum number of flags to display | `1-250` |
| `label` | string | `Visitors` | Label text above the counter | Any text or `none` to hide |
| `showcount` | boolean | `true` | Show visitor count | `true`, `false` |
| `visitortype` | string | `number` | Display type for visitors | `number`, `percentage` |
| `showlabels` | boolean | `false` | Show country names | `true`, `false` |
| `flagsfrom` | string | `all` | Filter flags by country | `all`, `us`, `ca` |
| `size` | string | `medium` | Flag size | `small`, `medium`, `large` |
| `bg` | string | Theme default | Background color (hex) | Any 6-digit hex color |
| `text` | string | Theme default | Text color (hex) | Any 6-digit hex color |
| `border` | string | Theme default | Border color (hex) | Any 6-digit hex color |

## 🖼️ Examples

### Basic Counter
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666)
```
![Basic Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666)

### Dark Theme with More Flags
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark&maxflags=20)
```
![Dark Theme Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark&maxflags=20)

### Custom Layout - 4 Columns
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&columns=4&maxflags=16)
```
![4 Columns Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&columns=4&maxflags=16)

### GitHub Dark Theme with Percentage
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark&visitortype=percentage)
```
![GitHub Dark Theme Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark&visitortype=percentage)

### No Label
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=none)
```
![No Label Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=none)

### Custom Label
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=Profile%20Views)
```
![Custom Label Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&label=Profile%20Views)

### Show Country Names
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&showlabels=true&columns=1&maxflags=5)
```
![Country Names Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&showlabels=true&columns=1&maxflags=5)

### Large Flags
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=large&columns=3)
```
![Large Flags Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&size=large&columns=3)

### Custom Colors
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&bg=0D1117&text=58A6FF&border=30363D)
```
![Custom Colors Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&bg=0D1117&text=58A6FF&border=30363D)

### Hide Visitor Count
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&showcount=false)
```
![Hide Count Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&showcount=false)

### US Visitors Only
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&flagsfrom=us)
```
![US Only Example](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&flagsfrom=us)

## 🎨 Themes

### Default Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=default)
```
- Background: `#FFFFFF`
- Text: `#000000`
- Border: `#CCCCCC`

### Dark Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=dark)
```
- Background: `#0D1117`
- Text: `#C9D1D9`
- Border: `#30363D`

### GitHub Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github)
```
- Background: `#24292E`
- Text: `#FFFFFF`
- Border: `#444D56`

### GitHub Dark Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=github_dark)
```
- Background: `#161B22`
- Text: `#E6EDF3`
- Border: `#30363D`

### Transparent Theme
```markdown
![](https://github-visitor-counter-zeta.vercel.app/api?username=ChanMeng666&theme=transparent)
```
- Background: `#FFFFFF`
- Text: `#000000`
- Border: `#FFFFFF`

## 🔧 Advanced Usage

### Centering the Counter
```markdown
<div align="center">
  
  ![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
  
</div>
```

### Multiple Counters with Different Styles
```markdown
<!-- Light Mode -->
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&theme=default)

<!-- Dark Mode -->
![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME&theme=dark)
```

### With Caption
```markdown
<div align="center">
  
  ### 🌍 Visitors from around the world
  
  ![](https://github-visitor-counter-zeta.vercel.app/api?username=YOUR_USERNAME)
  
  <sub>Thank you for visiting my profile!</sub>
  
</div>
```

## 📡 API Reference

### Base URL
```
https://github-visitor-counter-zeta.vercel.app/api
```

### Request Method
- `GET`

### Response
- Redirects to Flag Counter image with specified parameters

### Rate Limiting
- No explicit rate limits
- Cached for 1 hour by default

### Error Handling
- Invalid parameters return a 400 error with usage instructions
- Missing username returns a 400 error

## 🏠 Self-Hosting

You can deploy your own instance of GitHub Visitor Counter:

### Deploy to Vercel

1. Fork this repository
2. Create a [Vercel account](https://vercel.com)
3. Import your forked repository
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ChanMeng666/github-visitor-counter)

### Local Development

```bash
# Clone the repository
git clone https://github.com/ChanMeng666/github-visitor-counter.git

# Navigate to project directory
cd github-visitor-counter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Created by [Chan Meng](https://github.com/ChanMeng666)
- Powered by [Flag Counter](https://flagcounter.com)
- Hosted on [Vercel](https://vercel.com)

## ⚠️ Important Notes

1. **Privacy**: No personal data is stored. The service only tracks country-level visitor information.
2. **Caching**: Counters are cached for 1 hour to improve performance.
3. **Unique Counters**: Each parameter combination creates a unique counter.
4. **Flag Display**: Some browsers may not display flag emojis correctly. The actual counter uses image flags.

## 💬 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/ChanMeng666/github-visitor-counter/issues)
- Check existing issues for solutions
- Read the documentation carefully

---

<div align="center">
  Made with ❤️ for the GitHub community
</div>