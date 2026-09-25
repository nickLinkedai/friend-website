# MoonMade website

**Live site:** https://nicklinkedai.github.io/friend-website/

## How to edit the site with Claude Code

**One-time setup**
1. Install Claude Code: https://claude.com/claude-code
2. Install the GitHub CLI and log in: `brew install gh` then `gh auth login`
3. Download the site: `gh repo clone nickLinkedai/friend-website`

**Making changes**
1. Open the `friend-website` folder in VS Code (or run `claude` in it from the terminal).
2. Ask Claude for what you want, e.g. *"Change the headline to 'Fresh bread every morning'"* or
   *"Add this photo to the About section."*
3. Preview locally: open `index.html` in your browser.
4. When you're happy, tell Claude: **"commit and push"**.
5. Wait about a minute and refresh the live site.

## Adding a real domain later
Buy the domain, then in this repo go to **Settings → Pages → Custom domain** and follow the DNS instructions.
