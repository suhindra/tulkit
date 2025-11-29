import type { ActiveTab } from './components/Formatter'
import type { UuidVersion } from './components/UuidGenerator'

export type OverviewContent = {
  heading: string
  paragraphs: string[]
}

export const formatterOverviewByTab: Record<ActiveTab,OverviewContent> = {
  auto: {
    heading: 'Web Formatter — Tulkit overview',
    paragraphs: [
      'Some developers keep their code perfectly aligned, while others move fast and end up with scripts that are hard to scan. Tulkit’s web formatter is designed to quickly tidy those rough snippets so they are easier for teammates, reviewers, and your future self to read.',
      'The formatter looks at the snippet you paste or upload, figures out whether it is HTML, CSS, JavaScript, JSON, SQL, or PHP, then applies consistent indentation to each line. Once the structure is cleaned up, you can copy, download, or share the formatted version without touching a full IDE or build pipeline.',
      'All of this work happens directly in your browser. Tulkit does not upload your code to a server or store it remotely, which makes the tool suitable for private repositories, client work, and internal snippets that should never leave your machine.',
      'This kind of formatter is especially helpful when you open a file with no indentation, paste code copied from a blog post, or receive a snippet from someone who does not follow your team’s style guide. A few clicks are usually enough to turn it into something readable and ready for review.',
      'Using the tool is straightforward: drag a file into the editor or paste your code, let Tulkit detect the language, then click Format. Adjust the tab size if you want different spacing, and when you are happy with the result, use the Copy or Download actions before hitting Clear to start again.'
    ]
  },
  html: {
    heading: 'HTML Formatter overview',
    paragraphs: [
      'Overview content for the HTML formatter slug. Explain what kind of HTML snippets people usually format here and how it helps.',
      'Replace these placeholder paragraphs with your own copy; this text only appears on the /formatter/html slug.'
    ]
  },
  css: {
    heading: 'CSS Formatter overview',
    paragraphs: [
      'Overview content for the CSS formatter slug. Describe how Tulkit can clean up stylesheets, utility classes, or component styles.',
      'Update this copy to focus on the CSS, SCSS, or Tailwind workflows that matter most to your users.'
    ]
  },
  js: {
    heading: 'JavaScript Formatter overview',
    paragraphs: [
      'Overview content for the JavaScript formatter slug. Talk about formatting snippets, modules, or debug output pasted from logs.',
      'You can also mention how this tool fits into front-end or Node.js development in your own words.'
    ]
  },
  json: {
    heading: 'JSON Formatter overview',
    paragraphs: [
      'Overview content for the JSON formatter slug. Describe how teams can prettify API responses, configs, or event payloads here.',
      'Adjust this text to highlight validation, collaboration, or debugging benefits specific to your JSON use cases.'
    ]
  },
  sql: {
    heading: 'SQL Formatter overviews',
    paragraphs: [
      'Overview content for the SQL formatter slug. Explain how Tulkit helps make long queries readable and shareable.',
      'Customize this copy to mention the databases, ORMs, or reporting tools that are most relevant to your audience.'
    ]
  },
  php: {
    heading: 'PHP Formatter overview',
    paragraphs: [
      'Overview content for the PHP formatter slug. Describe how this helps with Laravel, WordPress, or other PHP projects.',
      'Update these placeholders to match the frameworks, CMSs, or libraries that you want to target for SEO.'
    ]
  }
}

export const uuidOverviewByVersion: Record<UuidVersion,OverviewContent> = {
  v1: {
    heading: 'UUID v1 generator overview',
    paragraphs: [
      'Overview content for the UUID v1 generator slug. Explain when time-based UUIDs make sense in your stack.',
      'Replace this copy with your own examples, such as logs, background jobs, or batch imports.'
    ]
  },
  v4: {
    heading: 'UUID v4 generator overview',
    paragraphs: [
      'Overview content for the UUID v4 generator slug. Describe typical use cases for random identifiers in your applications.',
      'You can mention public URLs, database primary keys, or any scenarios where v4 is a good default.'
    ]
  },
  v7: {
    heading: 'UUID v7 generator overview',
    paragraphs: [
      'Overview content for the UUID v7 generator slug. Explain how time-ordered IDs help with write-heavy tables or analytics.',
      'Customize this text to focus on the databases or event pipelines where UUID v7 shines for your users.'
    ]
  }
}

export const epochOverview: OverviewContent = {
  heading: 'Epoch Converter — Tulkit overview',
  paragraphs: [
    'Epoch time, sometimes called Unix time or POSIX time, counts how many seconds have passed since 1 January 1970 at 00:00:00 UTC. Because this number is the same no matter which country or time zone you are in, it is a convenient way for systems and APIs to talk about a specific instant in time.',
    'Tulkit’s epoch converter turns those raw timestamp numbers into readable dates and times, and back again. You can paste a value like 1764298543 to see when it happens in UTC, GMT-style long form, or your preferred time zone, then copy the formatted result for documentation, debugging notes, or support replies.',
    'When you go the other direction—starting from a date—you can experiment with different time zones and immediately see the matching Unix seconds and milliseconds. This makes it easier to align logs, schedule jobs, or compare records between services that may all be storing timestamps in slightly different formats.',
    'All calculations run entirely in your browser using the built-in JavaScript date APIs, so none of your event data or log excerpts are uploaded to a server while you are exploring timestamps.'
  ]
}
