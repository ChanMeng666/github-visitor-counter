<div align="center">

<img src="./public/github-visitor-counter-logo.svg" width="96" alt="GitHub Visitor Counter logo" />

# GitHub Visitor Counter

### See where your README visitors come from.

Add one line to your README. Get a live image of your visitors' country flags.

<a href="https://github-visitor-counter-tau.vercel.app/dashboard"><img src="./.github/readme/pill-configure-yours.svg" height="40" alt="Configure yours"></a> <a href="https://github-visitor-counter-tau.vercel.app"><img src="./.github/readme/pill-live-site.svg" height="40" alt="Live site"></a> <a href="https://github-visitor-counter-tau.vercel.app/api-help"><img src="./.github/readme/pill-api-help.svg" height="40" alt="API help"></a> <a href="docs/overview.md"><img src="./.github/readme/pill-full-overview.svg" height="40" alt="Full overview"></a>

</div>

<br>

<div align="center">
<a href="https://github-visitor-counter-tau.vercel.app/dashboard"><img src="https://github-visitor-counter-tau.vercel.app/api?username=ChanMeng666&theme=github_dark&displayMode=flagMap&mapSize=medium" width="600" alt="A world map with a flag on every country that has visited Chan Meng's GitHub profile, and the page view count below it."></a>

<sub>This is the counter itself, live, for <a href="https://github.com/ChanMeng666">@ChanMeng666</a>.</sub>
</div>

<br>

## Try it

Paste this into your README and replace `YOUR_USERNAME` with your GitHub username:

```markdown
![](https://github-visitor-counter-tau.vercel.app/api?username=YOUR_USERNAME)
```

No account is needed. A new counter starts from zero and fills up as people visit.

<br>

<div align="center">

<img src="https://github-visitor-counter-tau.vercel.app/api?username=ChanMeng666&theme=github_dark&columns=4&maxflags=12" alt="Top countries, four columns, github_dark theme" />

<sub><code>&theme=github_dark&columns=4&maxflags=12</code></sub>

<br>

<img src="https://github-visitor-counter-tau.vercel.app/api?username=ChanMeng666&theme=github_dark&showlabels=true&maxflags=6" alt="Top countries with country codes shown" />

<sub><code>&showlabels=true&maxflags=6</code></sub>

<br>

<img src="https://github-visitor-counter-tau.vercel.app/api?username=ChanMeng666&theme=github_dark&displayMode=miniCounter&miniDisplay=pageviews" alt="Mini counter showing page views" />

<sub><code>&displayMode=miniCounter&miniDisplay=pageviews</code></sub>

</div>

<br>

The image at the top is `&displayMode=flagMap&mapSize=medium`. To pick options by eye, use the [dashboard](https://github-visitor-counter-tau.vercel.app/dashboard): it previews the counter and writes the line for you.

## How it works

```mermaid
flowchart LR
    R([Someone opens<br/>your README]) --> A["/api?username=..."]
    A --> H[Username becomes<br/>a counter ID]
    H --> D[301 redirect]
    D --> F([Flag Counter<br/>draws the image])
```

The counting and the image come from [Flag Counter](https://flagcounter.com). This project gives you the one-line URL, the themes and the dashboard. Responses are cached for one hour.

## For your agent

This page is all a person needs. Every parameter, display mode and theme is in the docs: clone the repo and point your coding agent at [`docs/overview.md`](docs/overview.md) and [`CLAUDE.md`](CLAUDE.md).

```bash
git clone https://github.com/ChanMeng666/github-visitor-counter.git
```

<sub>[Full overview](docs/overview.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Support](SUPPORT.md) · [MIT](LICENSE)</sub>

<sub>Built by [Chan Meng](https://github.com/ChanMeng666).</sub>
