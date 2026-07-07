# WebLift Lead Machine — n8n build guide

**What you're building:** a pipeline that finds local trades, lets Claude check if their website is
bad, and drops the good prospects (with a ready-to-read pitch) into a Google Sheet for you to review.
**It never sends an email by itself** — you stay in control of every contact.

> Read this top-to-bottom once before touching n8n. Then build node by node, testing as you go.
> Prompts for the AI steps live in `prompts.md` (same folder) — copy-paste from there.

---

## Before you start — the mental model

Think of n8n as a row of dominoes. Each box ("node") does one small job, then passes its result to
the next box down the line. You build left-to-right. You can click any box and hit **"Test step"** to
run just that one and see what comes out — that's how you learn what each box does without running the
whole thing.

Our row of dominoes:

```
Start  →  Settings  →  Find businesses  →  Got a website?  →  Read the site  →
Claude: is it bad?  →  Only the bad ones  →  Claude: write a pitch  →  Save to Sheet  →  Ping me
```

---

## Step 0 — Get into n8n

You started a 14-day n8n Cloud trial. Log in, click **"Create Workflow"** (top right), and name it
**WebLift Lead Machine** (click the name at the top-left to rename).

> **14-day plan:** use the trial to learn and get one clean run. If it's earning its keep by day 12,
> we move it to Railway (~$5/mo) so you're not on a subscription. Nothing here is trial-only —
> everything transfers.

---

## Step 1 — Plug in your keys (do this once)

n8n keeps your API keys in its own locked vault. **You type them straight into n8n — never paste a key
into this chat.** Each key you add becomes a reusable "Credential" you pick from a dropdown later.

In n8n, top-right menu → **Credentials** → **Add credential**. Add these (the values are in your
workspace `.env` file — open it in your editor and copy from there):

| Credential to add | Type to choose in n8n | Which `.env` line |
|---|---|---|
| Anthropic (Claude) | "Anthropic API" | `ANTHROPIC_API_KEY` |
| Apollo | "Header Auth" (name: `X-Api-Key`, value: your key) | `APOLLO_API_KEY` |
| Firecrawl | "Header Auth" (name: `Authorization`, value: `Bearer <your key>`) | `FIRECRAWL_API_KEY` |
| Google Sheets | "Google Sheets OAuth2" (click through Google sign-in) | uses Google login, not a `.env` key |
| Slack (optional) | "Slack API" | `SLACK_BOT_TOKEN` |

You only do this once. Later, each node just asks "which credential?" and you pick from the list.

---

## Step 2 — The nodes, in order

For each one: click the **+** on the canvas, search the node name, drop it, then set the fields below.

### 2a. Start — "Manual Trigger"
Search **"Manual Trigger"**. No settings. This is the "Test workflow" button you'll press to run the
whole thing while testing. (We swap it for a daily timer at the very end.)

### 2b. Settings — "Edit Fields (Set)"
Search **"Edit Fields"** (older n8n calls it "Set"). This is your one control panel — change your
target here, nowhere else. Add three fields (String):

| Name | Value (example) |
|---|---|
| `current_niche` | `kitchen fitters` |
| `location` | `London, United Kingdom` |
| `max_leads` | `3` |

> Keep `max_leads` at **3** for your first run. Small + cheap while you're checking it works.

### 2c. Find businesses — "HTTP Request" (Apollo)
There's no ready-made Apollo box, so we use the generic **HTTP Request** node to talk to Apollo
directly. Settings:

- **Method:** POST
- **URL:** `https://api.apollo.io/api/v1/mixed_companies/search`
- **Authentication:** Generic → your Apollo "Header Auth" credential
- **Send Body:** ON, type **JSON**. Body:
  ```json
  {
    "q_organization_keyword_tags": ["{{ $json.current_niche }}"],
    "organization_locations": ["{{ $json.location }}"],
    "per_page": "{{ $json.max_leads }}"
  }
  ```

> ⚠️ **First thing to test.** Apollo's free/cheap plans often limit or block the search API, and
> Apollo's data leans toward bigger Ltd companies — it may return few or no one-man trades. **Click
> "Test step" on this node first.** If it errors (401/403) or comes back empty/full of big firms,
> that's expected — see "If Apollo disappoints" at the bottom. The whole rest of the pipeline works
> the same regardless of where the leads come from.

After this node, add a **"Split Out"** or **"Item Lists"** node if Apollo returns the companies in one
big list, so each business becomes its own item flowing down the line. (Test 2c first — you'll see the
shape and know if you need this.)

### 2d. Got a website? — "IF"
Search **"IF"**. This splits the flow in two:
- **Condition:** `{{ $json.website_url }}` **is empty**
- **TRUE branch** (no website) → these are your *hottest* leads. Wire TRUE into a small **Edit Fields**
  node that sets `biggest_flaw` = `No website at all` and `score` = `1`, then jump it straight to the
  pitch step (2g).
- **FALSE branch** (has a website) → continues to "Read the site" (2e).

### 2e. Read the site — "HTTP Request" (Firecrawl)
Another **HTTP Request** node. Firecrawl turns a messy webpage into clean text Claude can read.

- **Method:** POST
- **URL:** `https://api.firecrawl.dev/v1/scrape`
- **Authentication:** your Firecrawl "Header Auth" credential
- **Send Body:** ON, JSON:
  ```json
  {
    "url": "{{ $json.website_url }}",
    "formats": ["markdown"]
  }
  ```

The clean text comes back at roughly `{{ $json.data.markdown }}` — confirm the exact path by testing
this node and looking at the output panel.

### 2f. Claude: is it bad? — "Basic LLM Chain"
Search **"Basic LLM Chain"**. Then click the little **+** under it labelled **"Chat Model"** and add an
**"Anthropic Chat Model"** sub-node.

- **Anthropic Chat Model → Model:** `claude-haiku-4-5-20251001` (Haiku 4.5 — fast + cheap, perfect for
  a yes/no audit)
- **Basic LLM Chain → Prompt:** paste the **Audit prompt** from `prompts.md`. It tells Claude to reply
  in strict JSON only.

Then add a **"Code"** node right after (JavaScript) to turn Claude's JSON text into real fields:
```js
const out = JSON.parse($json.text);   // if .text isn't the field, check the LLM node's output panel
return { json: out };
```

Then an **"IF"** node:
- **Condition:** `{{ $json.has_bad_website }}` **is true**
- FALSE branch → just leave it unconnected (the lead quietly drops — site's already good, no pitch
  wasted). This is your money-saver.
- TRUE branch → continues to the pitch.

### 2g. Claude: write a pitch — "Basic LLM Chain"
Same as 2f: a **Basic LLM Chain** + its own **Anthropic Chat Model** (model
`claude-haiku-4-5-20251001`). Paste the **Pitch prompt** from `prompts.md`. It writes a 3-sentence
casual pitch + 3 cold-call talking points, in WebLift's friendly anti-agency voice.

### 2h. Save to Sheet — "Google Sheets"
First make the Sheet: in Google Drive create a blank sheet called **WebLift Leads** with a header row:
`company | phone | website | score | biggest_flaw | draft_pitch | talking_points | tps_ctps_checked | status`

Then the **Google Sheets** node:
- **Operation:** Append Row
- **Document:** pick "WebLift Leads"
- Map each column to the matching field (company name, phone, etc.). Set `tps_ctps_checked` to blank
  and `status` to `NEW`.

### 2i. Ping me — "Slack" (optional)
**Slack** node → Send Message to your channel: `🔔 {{ $runIndex + 1 }} new WebLift leads to review`.
Skip this if you'd rather just check the Sheet.

---

## Step 3 — Test it (the safety run)

1. Top bar → **"Test workflow"**. It runs left to right; each node turns green as it passes.
2. If a node goes **red**, click it, read the error, fix that one box, test just that step again.
   (One problem at a time — don't change three things at once.)
3. Success = 1–3 rows land in your **WebLift Leads** sheet, each with a pitch you'd actually be happy
   to read aloud.
4. **Read one pitch out loud.** Does it sound like a helpful neighbour, not a robot? If not, tweak the
   Pitch prompt in `prompts.md` and re-test 2g. *This is the whole point of the Sheet — you eyeball
   the AI's work before any human ever sees it.*

---

## Step 4 — Before you call anyone (the legal bit — don't skip)

UK law (PECR) means you **must screen every phone number against TPS *and* CTPS before cold-calling**.
Most one-man trades are sole traders, who sit on the *consumer* TPS list. That's why the Sheet has a
`tps_ctps_checked` column — **a number doesn't get dialled until that box says yes.** Fines go up to
£500k. (Full reasoning: `../wiki/research/niche_selection.md`.) This stays a manual check for now —
there's no cheap auto-screening API worth wiring in at test scale.

---

## Step 5 — Go daily (only after a clean test run)

Replace the **Manual Trigger** (2a) with a **"Schedule Trigger"** set to once a day at 9am, and bump
`max_leads` up gradually (start at 5). Now it quietly fills your review queue every morning.

---

## If Apollo disappoints

Apollo is built for B2B companies with a LinkedIn footprint — it's thin on one-man kitchen fitters and
roofers, which are exactly who we want. If your test in 2c comes back empty or full of big firms,
swap **only node 2c** for one of these (everything downstream is identical):

- **Manual CSV:** build a list by hand (Google Maps, Checkatrade), save as CSV, and start the workflow
  with a **"Read/Import Files"** node instead of Apollo. Cheapest, proves the rest of the pipeline now.
- **Apify Google Maps Scraper:** ~$5–10 per few thousand local listings, returns name/phone/website —
  far better local coverage. Has a near-native n8n integration. This is the likely "real" lead source
  once the pitch is proven.

Tell me which way you want to go and I'll write that node's exact config.
