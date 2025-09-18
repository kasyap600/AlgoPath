// src/data/30_day_plan.js
// Export an array of 30 days. Each day is an array of problem objects.
const dayPlan = [
  // Day 1
  [
    { title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Array" },
    { title: "Two Sum II - Input array is sorted", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Easy", topic: "Array" },
  ],
  // Day 2
  [
    { title: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", topic: "Array" },
    { title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", topic: "Array" },
  ],
  // Day 3
  [
    { title: "Minimum Size Subarray Sum", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium", topic: "Sliding Window" },
    { title: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium", topic: "Sliding Window" },
  ],
  // Day 4
  [
    { title: "3Sum", link: "https://leetcode.com/problems/3sum/", difficulty: "Medium", topic: "Two Pointers" },
    { title: "4Sum", link: "https://leetcode.com/problems/4sum/", difficulty: "Medium", topic: "Two Pointers" },
  ],
  // Day 5
  [
    { title: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", topic: "Intervals" },
    { title: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium", topic: "Two Pointers" },
  ],
  // Day 6
  [
    { title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", topic: "Two Pointers / Stack" },
  ],
  // Day 7
  [
    { title: "Sort an Array", link: "https://leetcode.com/problems/sort-an-array/", difficulty: "Medium", topic: "Sorting" },
    { title: "Kth Largest Element in an Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium", topic: "Heap" },
  ],
  // Day 8
  [
    { title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", topic: "Strings" },
    { title: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", topic: "Strings / Hashing" },
  ],
  // Day 9
  [
    { title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", topic: "Hashing" },
    { title: "Sort Characters By Frequency", link: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "Medium", topic: "Hashing" },
  ],
  // Day 10
  [
    { title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium", topic: "Strings" },
    { title: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", topic: "Strings" },
  ],
  // Day 11
  [
    { title: "Implement strStr() (KMP)", link: "https://leetcode.com/problems/implement-strstr/", difficulty: "Easy/Medium", topic: "Strings / KMP" },
    { title: "Rabin-Karp (concept)", link: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", difficulty: "Concept", topic: "Strings" },
  ],
  // Day 12
  [
    { title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", topic: "Heap/Hash" },
    { title: "Largest Number", link: "https://leetcode.com/problems/largest-number/", difficulty: "Medium", topic: "Sorting" },
  ],
  // Day 13
  [
    { title: "Two-pointer + Hashing wrap-up (practice 1)", link: "https://leetcode.com/problemset/all/?topicSlugs=two-pointers", difficulty: "Mixed", topic: "Mix" },
    { title: "Two-pointer + Hashing wrap-up (practice 2)", link: "https://leetcode.com/problemset/all/?topicSlugs=hash-table", difficulty: "Mixed", topic: "Mix" },
  ],
  // Day 14 (mock set — pick three but we keep two for UI)
  [
    { title: "Mock Timed - Problem A (from week 1/2)", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Mock" },
    { title: "Mock Timed - Problem B (from week 1/2)", link: "https://leetcode.com/problems/3sum/", difficulty: "Medium", topic: "Mock" },
  ],
  // Day 15
  [
    { title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", topic: "Stack" },
    { title: "Min Stack", link: "https://leetcode.com/problems/min-stack/", difficulty: "Easy/Medium", topic: "Stack" },
  ],
  // Day 16
  [
    { title: "Next Greater Element I", link: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy", topic: "Monotonic Stack" },
    { title: "Sliding Window Maximum", link: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", topic: "Deque/Monotonic" },
  ],
  // Day 17
  [
    { title: "Moving Average from Data Stream", link: "https://leetcode.com/problems/moving-average-from-data-stream/", difficulty: "Easy", topic: "Queue/Stream" },
    { title: "Design Hit Counter (concept)", link: "https://www.geeksforgeeks.org/design-hit-counter/", difficulty: "Concept", topic: "Queue" },
  ],
  // Day 18
  [
    { title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", topic: "Linked List" },
    { title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", topic: "Linked List" },
  ],
  // Day 19
  [
    { title: "Remove Nth Node From End of List", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium", topic: "Linked List" },
    { title: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/", difficulty: "Medium", topic: "Linked List" },
  ],
  // Day 20
  [
    { title: "Subsets", link: "https://leetcode.com/problems/subsets/", difficulty: "Medium", topic: "Recursion/Backtracking" },
    { title: "Permutations", link: "https://leetcode.com/problems/permutations/", difficulty: "Medium", topic: "Recursion/Backtracking" },
  ],
  // Day 21
  [
    { title: "Generate Parentheses", link: "https://leetcode.com/problems/generate-parentheses/", difficulty: "Medium", topic: "Backtracking" },
    { title: "N-Queens", link: "https://leetcode.com/problems/n-queens/", difficulty: "Hard", topic: "Backtracking" },
  ],
  // Day 22
  [
    { title: "Binary Tree Inorder Traversal", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy", topic: "Tree" },
    { title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", topic: "Tree" },
  ],
  // Day 23
  [
    { title: "Lowest Common Ancestor of a Binary Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", topic: "Tree" },
    { title: "Serialize and Deserialize Binary Tree", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", topic: "Tree" },
  ],
  // Day 24
  [
    { title: "Merge k Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", topic: "Heap" },
    { title: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", topic: "Heap" },
  ],
  // Day 25
  [
    { title: "Activity Selection (concept)", link: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", difficulty: "Concept", topic: "Greedy" },
    { title: "Job Sequencing Problem (concept)", link: "https://www.geeksforgeeks.org/job-sequencing-problem/", difficulty: "Concept", topic: "Greedy" },
  ],
  // Day 26
  [
    { title: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard", topic: "Binary Search" },
    { title: "Find Peak Element", link: "https://leetcode.com/problems/find-peak-element/", difficulty: "Medium", topic: "Binary Search" },
  ],
  // Day 27
  [
    { title: "Range Sum Query - Mutable (Segment Tree)", link: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "Hard", topic: "Segment Tree" },
    { title: "Segment Tree (concept)", link: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/", difficulty: "Concept", topic: "Segment Tree" },
  ],
  // Day 28
  [
    { title: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", topic: "Graph / BFS" },
    { title: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", topic: "BFS / Multi-source" },
  ],
  // Day 29
  [
    { title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy", topic: "Dynamic Programming" },
    { title: "Fibonacci Number", link: "https://leetcode.com/problems/fibonacci-number/", difficulty: "Easy", topic: "Dynamic Programming" },
  ],
  // Day 30 (mock)
  [
    { title: "Mock: Hard 1", link: "https://leetcode.com/problemset/all/?difficulty=Hard", difficulty: "Hard", topic: "Mock" },
    { title: "Mock: Medium 1", link: "https://leetcode.com/problemset/all/?difficulty=Medium", difficulty: "Medium", topic: "Mock" },
  ],
];

export default dayPlan;
