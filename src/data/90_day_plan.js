// src/data/90_day_plan.js
// "DSA Grandmaster 90" plan (with 3 optional mock days appended).
// Each entry is an array of 1-3 problem objects for that day:
// { title, link, difficulty, topic }

const ninetyDayPlan = [
  // Phase 1 — Foundations (Days 1–30)
  // Week 1 — Arrays Basics
  [ // Day 1
    { title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", topic: "Array" },
    { title: "Two Sum II - Input array is sorted", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Easy", topic: "Array" }
  ],
  [ // Day 2
    { title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", topic: "Array" },
    { title: "Maximum Subarray (Kadane)", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Easy/Medium", topic: "Array" }
  ],
  [ // Day 3
    { title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", topic: "Array" },
    { title: "Move Zeroes", link: "https://leetcode.com/problems/move-zeroes/", difficulty: "Easy", topic: "Array" }
  ],
  [ // Day 4
    { title: "Rotate Array", link: "https://leetcode.com/problems/rotate-array/", difficulty: "Easy", topic: "Array" },
    { title: "Majority Element", link: "https://leetcode.com/problems/majority-element/", difficulty: "Easy", topic: "Array" }
  ],
  [ // Day 5
    { title: "Majority Element II", link: "https://leetcode.com/problems/majority-element-ii/", difficulty: "Medium", topic: "Array" },
    { title: "Sort Colors (Dutch National Flag)", link: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", topic: "Array/Two Pointers" }
  ],
  [ // Day 6
    { title: "Minimum Size Subarray Sum", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium", topic: "Sliding Window" },
    { title: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium", topic: "Hash/Prefix" }
  ],
  [ // Day 7
    { title: "Spiral Matrix", link: "https://leetcode.com/problems/spiral-matrix/", difficulty: "Medium", topic: "Array" }
  ],

  // Week 2 — Arrays Advanced & Intervals
  [ // Day 8
    { title: "3Sum", link: "https://leetcode.com/problems/3sum/", difficulty: "Medium", topic: "Two Pointers" }
  ],
  [ // Day 9
    { title: "4Sum", link: "https://leetcode.com/problems/4sum/", difficulty: "Medium", topic: "Two Pointers" }
  ],
  [ // Day 10
    { title: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium", topic: "Two Pointers" }
  ],
  [ // Day 11
    { title: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", topic: "Intervals" }
  ],
  [ // Day 12
    { title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", topic: "Two Pointers/Stack" }
  ],
  [ // Day 13
    { title: "Longest Consecutive Sequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "Hard", topic: "Hash/Array" }
  ],
  [ // Day 14
    { title: "Review set — pick 2 unsolved problems", link: "https://leetcode.com/problemset/all/", difficulty: "Mixed", topic: "Review" }
  ],

  // Week 3 — Sorting & basics
  [ // Day 15
    { title: "Sort an Array", link: "https://leetcode.com/problems/sort-an-array/", difficulty: "Medium", topic: "Sorting" }
  ],
  [ // Day 16
    { title: "Kth Largest Element in an Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium", topic: "Heap" }
  ],
  [ // Day 17
    { title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", topic: "Heap/Hash" }
  ],
  [ // Day 18
    { title: "Largest Number", link: "https://leetcode.com/problems/largest-number/", difficulty: "Medium", topic: "Sorting/Greedy" }
  ],
  [ // Day 19
    { title: "Sort Characters By Frequency", link: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "Medium", topic: "Hash" }
  ],
  [ // Day 20
    { title: "Counting Sort (concept)", link: "https://www.geeksforgeeks.org/counting-sort/", difficulty: "Concept", topic: "Sorting" },
    { title: "Merge Sort (concept)", link: "https://www.geeksforgeeks.org/merge-sort/", difficulty: "Concept", topic: "Sorting" }
  ],
  [ // Day 21
    { title: "Quick Sort (concept)", link: "https://www.geeksforgeeks.org/quick-sort/", difficulty: "Concept", topic: "Sorting" },
    { title: "Heap Sort (concept)", link: "https://www.geeksforgeeks.org/heap-sort/", difficulty: "Concept", topic: "Sorting" }
  ],

  // Week 4 — Strings & Hashing
  [ // Day 22
    { title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium", topic: "Strings" }
  ],
  [ // Day 23
    { title: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", topic: "Strings" }
  ],
  [ // Day 24
    { title: "Implement strStr() (KMP)", link: "https://leetcode.com/problems/implement-strstr/", difficulty: "Easy/Medium", topic: "Strings" }
  ],
  [ // Day 25
    { title: "Rabin–Karp (concept)", link: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", difficulty: "Concept", topic: "Strings" }
  ],
  [ // Day 26
    { title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", topic: "Strings" }
  ],
  [ // Day 27
    { title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", topic: "Hashing" }
  ],
  [ // Day 28
    { title: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", topic: "Strings/Hash" }
  ],

  // Phase 2 — Core DS (Days 31–60)
  // Week 5 — Stacks & Queues
  [ // Day 29
    { title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", topic: "Stack" },
    { title: "Min Stack", link: "https://leetcode.com/problems/min-stack/", difficulty: "Easy/Medium", topic: "Stack" }
  ],
  [ // Day 30
    { title: "Decode String", link: "https://leetcode.com/problems/decode-string/", difficulty: "Medium", topic: "Stack/Strings" }
  ],
  [ // Day 31
    { title: "Next Greater Element I", link: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy", topic: "Monotonic Stack" },
    { title: "Previous Smaller Element (concept)", link: "https://www.geeksforgeeks.org/previous-smaller-element/", difficulty: "Concept", topic: "Stack" }
  ],
  [ // Day 32
    { title: "Next Smaller Element (concept)", link: "https://www.geeksforgeeks.org/next-smaller-element/", difficulty: "Concept", topic: "Stack" },
    { title: "Previous Greater Element (concept)", link: "https://www.geeksforgeeks.org/previous-greater-element/", difficulty: "Concept", topic: "Stack" }
  ],
  [ // Day 33
    { title: "Sliding Window Maximum", link: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", topic: "Deque/Sliding Window" }
  ],
  [ // Day 34
    { title: "Implement Queue using Stacks", link: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "Easy", topic: "Queue/Stack" }
  ],
  [ // Day 35
    { title: "Design Circular Queue", link: "https://leetcode.com/problems/design-circular-queue/", difficulty: "Medium", topic: "Queue" },
    { title: "Design Circular Deque", link: "https://leetcode.com/problems/design-circular-deque/", difficulty: "Medium", topic: "Queue/Design" }
  ],

  // Week 6 — Linked List
  [ // Day 36
    { title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", topic: "Linked List" },
    { title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", topic: "Linked List" }
  ],
  [ // Day 37
    { title: "Remove Nth Node From End of List", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium", topic: "Linked List" },
    { title: "Middle of the Linked List", link: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "Easy", topic: "Linked List" }
  ],
  [ // Day 38
    { title: "Palindrome Linked List", link: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "Easy/Medium", topic: "Linked List" }
  ],
  [ // Day 39
    { title: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/", difficulty: "Medium", topic: "Linked List" }
  ],
  [ // Day 40
    { title: "Linked List Cycle II", link: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium", topic: "Linked List" }
  ],
  [ // Day 41
    { title: "Intersection of Two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/", difficulty: "Easy", topic: "Linked List" }
  ],
  [ // Day 42
    { title: "LRU Cache (design)", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Hard", topic: "Design/DS" }
  ],

  // Week 7 — Recursion & Backtracking
  [ // Day 43
    { title: "Pow(x, n)", link: "https://leetcode.com/problems/powx-n/", difficulty: "Medium", topic: "Recursion" }
  ],
  [ // Day 44
    { title: "Subsets", link: "https://leetcode.com/problems/subsets/", difficulty: "Medium", topic: "Backtracking" }
  ],
  [ // Day 45
    { title: "Permutations", link: "https://leetcode.com/problems/permutations/", difficulty: "Medium", topic: "Backtracking" }
  ],
  [ // Day 46
    { title: "Letter Combinations of a Phone Number", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "Medium", topic: "Backtracking" }
  ],
  [ // Day 47
    { title: "Generate Parentheses", link: "https://leetcode.com/problems/generate-parentheses/", difficulty: "Medium", topic: "Backtracking" }
  ],
  [ // Day 48
    { title: "N-Queens", link: "https://leetcode.com/problems/n-queens/", difficulty: "Hard", topic: "Backtracking" }
  ],
  [ // Day 49
    { title: "Word Search II", link: "https://leetcode.com/problems/word-search-ii/", difficulty: "Hard", topic: "Trie/Backtracking" }
  ],

  // Week 8 — Trees
  [ // Day 50
    { title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", topic: "Tree" },
    { title: "Same Tree", link: "https://leetcode.com/problems/same-tree/", difficulty: "Easy", topic: "Tree" }
  ],
  [ // Day 51
    { title: "Binary Tree Inorder Traversal", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy", topic: "Tree" },
    { title: "Binary Tree Preorder Traversal", link: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "Easy", topic: "Tree" }
  ],
  [ // Day 52
    { title: "Binary Tree Postorder Traversal", link: "https://leetcode.com/problems/binary-tree-postorder-traversal/", difficulty: "Easy/Medium", topic: "Tree" },
    { title: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Easy", topic: "Tree" }
  ],
  [ // Day 53
    { title: "Diameter of Binary Tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy/Medium", topic: "Tree" }
  ],
  [ // Day 54
    { title: "Validate Binary Search Tree", link: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium", topic: "BST" }
  ],
  [ // Day 55
    { title: "Lowest Common Ancestor of a Binary Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", topic: "Tree" }
  ],
  [ // Day 56
    { title: "Serialize and Deserialize Binary Tree", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", topic: "Tree" }
  ],

  // Phase 3 — Advanced & Interview Prep (Days 61–90)
  // Week 9 — Heaps & Greedy
  [ // Day 57
    { title: "Merge k Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", topic: "Heap" }
  ],
  [ // Day 58
    { title: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", topic: "Heap" }
  ],
  [ // Day 59
    { title: "Sliding Window Median", link: "https://leetcode.com/problems/sliding-window-median/", difficulty: "Hard", topic: "Heap/Deque" }
  ],
  [ // Day 60
    { title: "Top K Frequent Words", link: "https://leetcode.com/problems/top-k-frequent-words/", difficulty: "Medium", topic: "Heap/Trie" }
  ],
  [ // Day 61
    { title: "Activity Selection (concept)", link: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", difficulty: "Concept", topic: "Greedy" }
  ],
  [ // Day 62
    { title: "Job Sequencing Problem (concept)", link: "https://www.geeksforgeeks.org/job-sequencing-problem/", difficulty: "Concept", topic: "Greedy" }
  ],
  [ // Day 63
    { title: "Huffman Coding (concept)", link: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/", difficulty: "Concept", topic: "Greedy" }
  ],

  // Week 10 — Binary Search & Advanced
  [ // Day 64
    { title: "Sqrt(x)", link: "https://leetcode.com/problems/sqrtx/", difficulty: "Easy", topic: "Binary Search" },
    { title: "Search Insert Position", link: "https://leetcode.com/problems/search-insert-position/", difficulty: "Easy", topic: "Binary Search" }
  ],
  [ // Day 65
    { title: "Median Of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard", topic: "Binary Search" }
  ],
  [ // Day 66
    { title: "Find First and Last Position of Element in Sorted Array", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium", topic: "Binary Search" }
  ],
  [ // Day 67
    { title: "Find Minimum in Rotated Sorted Array", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium", topic: "Binary Search" }
  ],
  [ // Day 68
    { title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium", topic: "Binary Search" }
  ],
  [ // Day 69
    { title: "Koko Eating Bananas", link: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "Medium", topic: "Binary Search/Greedy" }
  ],
  [ // Day 70
    { title: "Capacity To Ship Packages Within D Days", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", difficulty: "Medium", topic: "Binary Search/Greedy" }
  ],

  // Week 11 — Graphs
  [ // Day 71
    { title: "Number of Provinces", link: "https://leetcode.com/problems/number-of-provinces/", difficulty: "Medium", topic: "Graph" }
  ],
  [ // Day 72
    { title: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", topic: "Graph/BFS" }
  ],
  [ // Day 73
    { title: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", topic: "BFS" }
  ],
  [ // Day 74
    { title: "Flood Fill", link: "https://leetcode.com/problems/flood-fill/", difficulty: "Easy", topic: "BFS/DFS" }
  ],
  [ // Day 75
    { title: "Word Ladder I", link: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard", topic: "Graph" }
  ],
  [ // Day 76
    { title: "Word Ladder II", link: "https://leetcode.com/problems/word-ladder-ii/", difficulty: "Hard", topic: "Graph" }
  ],
  [ // Day 77
    { title: "Course Schedule I", link: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", topic: "Graph/Topo" }
  ],

  // Week 12 — Advanced Graphs & Union-Find
  [ // Day 78
    { title: "Course Schedule II", link: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium", topic: "Graph/Topo" }
  ],
  [ // Day 79
    { title: "Dijkstra's Shortest Path (concept)", link: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", difficulty: "Concept", topic: "Graph" }
  ],
  [ // Day 80
    { title: "Bellman–Ford (concept)", link: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", difficulty: "Concept", topic: "Graph" }
  ],
  [ // Day 81
    { title: "Floyd–Warshall (concept)", link: "https://www.geeksforgeeks.org/floyd-warshall-algorithm/", difficulty: "Concept", topic: "Graph" }
  ],
  [ // Day 82
    { title: "Minimum Spanning Tree - Kruskal (concept)", link: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", difficulty: "Concept", topic: "Graph" }
  ],
  [ // Day 83
    { title: "Prim's Algorithm (concept)", link: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/", difficulty: "Concept", topic: "Graph" }
  ],
  [ // Day 84
    { title: "Disjoint Set (Union-Find) (concept)", link: "https://www.geeksforgeeks.org/disjoint-set-data-structures/", difficulty: "Concept", topic: "Graph/DS" }
  ],

  // Week 13 — Dynamic Programming
  [ // Day 85
    { title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy", topic: "DP" },
    { title: "Fibonacci Number", link: "https://leetcode.com/problems/fibonacci-number/", difficulty: "Easy", topic: "DP" }
  ],
  [ // Day 86
    { title: "House Robber I", link: "https://leetcode.com/problems/house-robber/", difficulty: "Medium", topic: "DP" },
    { title: "House Robber II", link: "https://leetcode.com/problems/house-robber-ii/", difficulty: "Medium", topic: "DP" }
  ],
  [ // Day 87
    { title: "Coin Change II", link: "https://leetcode.com/problems/coin-change-2/", difficulty: "Medium", topic: "DP" }
  ],
  [ // Day 88
    { title: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "Medium", topic: "DP" }
  ],
  [ // Day 89
    { title: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium", topic: "DP" }
  ],
  [ // Day 90
    { title: "Partition Equal Subset Sum", link: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium", topic: "DP" },
    { title: "Word Break", link: "https://leetcode.com/problems/word-break/", difficulty: "Medium", topic: "DP/String" }
  ],

  // Optional Bonus: Final 3 Mock Days (Day 91–93)
  [ // Day 91
    { title: "Mock: 2 Arrays + 1 String + 1 Linked List", link: "https://leetcode.com/problemset/all/", difficulty: "Mixed", topic: "Mock" }
  ],
  [ // Day 92
    { title: "Mock: 2 Trees + 2 Graphs", link: "https://leetcode.com/problemset/all/", difficulty: "Mixed", topic: "Mock" }
  ],
  [ // Day 93
    { title: "Mock: DP + Binary Search + 1 Hard", link: "https://leetcode.com/problemset/all/", difficulty: "Mixed", topic: "Mock" }
  ]
];

export default ninetyDayPlan;
