// src/data/plans.js
import { problemsData } from "./problemsData";

/**
 * Plans export contains:
 * - id: unique id
 * - title: shown to user
 * - description
 * - type: "topic" | "custom" | "challenge"
 * - problems: array of {title, link, difficulty} (copied from problemsData)
 *
 * Note: For large plans (150 problems) you can build programmatically by taking
 * problems from problemsData in some order.
 */

const firstNFromTopic = (topic, n) => (problemsData[topic] || []).slice(0, n);

export const plans = [
  {
    id: "beginner-to-advance",
    title: "Beginner → Advanced (Topic Explorer)",
    description: "Step through topics from basic to advanced. Recommended to follow topic order.",
    type: "topic",
    // no explicit problems list — will load full topic explorer
  },
  {
    id: "150-must-solve",
    title: "150 Must-Solve Interview Problems",
    description: "A curated set of 150 high-frequency interview problems across topics.",
    type: "custom",
    // Example: take many problems across topics. build an array programmatically:
    problems: [
      // flatten by topic and limit to 150 (example below picks N per topic — modify later)
      ...firstNFromTopic("Arrays", 20),
      ...firstNFromTopic("LinkedList", 15),
      ...firstNFromTopic("Strings", 15),
      ...firstNFromTopic("Stack", 10),
      ...firstNFromTopic("Queue", 8),
      ...firstNFromTopic("Trees", 25),
      ...firstNFromTopic("Graphs", 20),
      ...firstNFromTopic("DynamicProgramming", 20),
      ...firstNFromTopic("Recursion", 7),
    ].slice(0, 150),
  },
  {
  id: "30-days",
  title: "30-Day Challenge",
  description: "Daily curated problems - 2 problems/day, intensive plan.",
  type: "challenge",
  days: 30,
  route: "/plans/30-days",
  tag: "Challenge",
},
  {
    id: "60-days",
    title: "60-Day Challenge",
    description: "Larger daily plan for 60 days.",
    type: "challenge",
    days: 60,
  },
  {
  id: "90-days",
  title: "DSA Grandmaster 90",
  description: "Foundations → Advanced → Interview mastery in 90 days (1–2 problems/day).",
  type: "challenge",
  days: 90,
  route: "/plans/90-days",
  tag: "Challenge",
},
];

export default plans;
