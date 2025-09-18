// COMPLETE topics dataset with difficulty tags.
// If a LeetCode slug isn't certain or problem isn't on LC, link is "#".
export const problemsData = {
  // 1. Arrays (foundation)
  Arrays: [
    { title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
    { title: "Two Sum (Sorted)", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Medium" },
    { title: "Best Time to Buy & Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy" },
    { title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium" },
    { title: "Maximum Subarray (Kadane’s Algorithm)", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Easy" },
    { title: "Minimum Size Subarray Sum", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium" },
    { title: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium" },
    { title: "Longest Subarray with Sum K", link: "https://www.geeksforgeeks.org/longest-sub-array-sum-k/", difficulty: "Medium" },
    { title: "Longest Consecutive Sequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "Hard" },
    { title: "3Sum", link: "https://leetcode.com/problems/3sum/", difficulty: "Medium" },
    { title: "4Sum", link: "https://leetcode.com/problems/4sum/", difficulty: "Medium" },
    { title: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium" },
    { title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard" },
    { title: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium" },
    { title: "Spiral Matrix", link: "https://leetcode.com/problems/spiral-matrix/", difficulty: "Medium" },
    { title: "Majority Element (> N/2 times)", link: "https://leetcode.com/problems/majority-element/", difficulty: "Easy" },
    { title: "Majority Element II (> N/3 times)", link: "https://leetcode.com/problems/majority-element-ii/", difficulty: "Medium" },
    { title: "Sort Colors (Dutch National Flag)", link: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium" },
    { title: "Move Zeroes", link: "https://leetcode.com/problems/move-zeroes/", difficulty: "Easy" },
    { title: "Rotate Array", link: "https://leetcode.com/problems/rotate-array/", difficulty: "Medium" },
  ],

  // 2. Sorting (right after arrays)
  Sorting: [
    { title: "Sort an Array", link: "https://leetcode.com/problems/sort-an-array/", difficulty: "Medium" }, // practice implementing merge/quick/heap
    { title: "Kth Largest Element in an Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" },
    { title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium" },
    { title: "Largest Number", link: "https://leetcode.com/problems/largest-number/", difficulty: "Medium" },
    { title: "Wiggle Sort", link: "https://leetcode.com/problems/wiggle-sort/", difficulty: "Easy" },
    { title: "Sort Transformed Array", link: "https://leetcode.com/problems/sort-transformed-array/", difficulty: "Medium" },
    { title: "Sort Characters By Frequency", link: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "Medium" },
    { title: "Counting Sort (concept & implementation)", link: "https://www.geeksforgeeks.org/counting-sort/", difficulty: "Easy" },
    { title: "Merge Sort (concept & implementation)", link: "https://www.geeksforgeeks.org/merge-sort/", difficulty: "Easy" },
    { title: "Quick Sort (concept & implementation)", link: "https://www.geeksforgeeks.org/quick-sort/", difficulty: "Easy" },
    { title: "Heap Sort (concept & implementation)", link: "https://www.geeksforgeeks.org/heap-sort/", difficulty: "Easy" }
  ],

  // 3. Strings
  Strings: [
    { title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium" },
    { title: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard" },
    { title: "Implement strStr() (KMP)", link: "https://leetcode.com/problems/implement-strstr/", difficulty: "Easy" },
    { title: "Rabin-Karp Algorithm", link: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", difficulty: "Medium" }
  ],

  // 4. Hashing / HashMap
  Hashing: [
    { title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
    { title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium" },
    { title: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy" }
  ],

  // 5. Two-pointers & Sliding window (covered across Arrays/Strings; keep Queue/Heaps for sliding-window problems)
  Stack: [
    { title: "Decode String", link: "https://leetcode.com/problems/decode-string/", difficulty: "Medium" },
    { title: "Next Smaller Element", link: "https://www.geeksforgeeks.org/next-smaller-element/", difficulty: "Medium" },
    { title: "Implement Queue using Stacks", link: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "Easy" },
    { title: "Previous Smaller Element", link: "https://www.geeksforgeeks.org/previous-smaller-element/", difficulty: "Medium" },
    { title: "Product of the Last K Numbers", link: "https://leetcode.com/problems/product-of-the-last-k-numbers/", difficulty: "Medium" },
    { title: "Next Greater Element I", link: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy" },
    { title: "Reverse Integer", link: "https://leetcode.com/problems/reverse-integer/", difficulty: "Medium" },
    { title: "Maximum Nesting Depth of the Parentheses", link: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", difficulty: "Easy" },
    { title: "Remove All Adjacent Duplicates In String", link: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", difficulty: "Easy" },
    { title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
    { title: "Baseball Game", link: "https://leetcode.com/problems/baseball-game/", difficulty: "Easy" },
    { title: "Min Stack", link: "https://leetcode.com/problems/min-stack/", difficulty: "Medium" },
    { title: "Previous Greater Element", link: "https://www.geeksforgeeks.org/previous-greater-element/", difficulty: "Medium" },
    { title: "Remove All Adjacent Duplicates in String II", link: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/", difficulty: "Medium" },
    { title: "Design a Stack With Increment Operation", link: "https://leetcode.com/problems/design-a-stack-with-increment-operation/", difficulty: "Medium" },
  ],

  Queue: [
    { title: "Design Circular Deque", link: "https://leetcode.com/problems/design-circular-deque/", difficulty: "Medium" },
    { title: "Design Circular Queue", link: "https://leetcode.com/problems/design-circular-queue/", difficulty: "Medium" },
    { title: "Implement Stack using Queues", link: "https://leetcode.com/problems/implement-stack-using-queues/", difficulty: "Easy" },
    { title: "Design Hit Counter", link: "https://www.geeksforgeeks.org/design-hit-counter/", difficulty: "Medium" },
    { title: "First Unique Character in a stream of characters", link: "https://www.geeksforgeeks.org/first-non-repeating-character-in-a-stream-of-characters/", difficulty: "Medium" },
    { title: "Moving Average from Data Stream", link: "https://leetcode.com/problems/moving-average-from-data-stream/", difficulty: "Easy" },
    { title: "Sliding Window Maximum", link: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" },
  ],

  // 6. Linked Lists
  LinkedList: [
    { title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy" },
    { title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy" },
    { title: "Remove Linked List Elements", link: "https://leetcode.com/problems/remove-linked-list-elements/", difficulty: "Easy" },
    { title: "Palindrome Linked List", link: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "Easy" },
    { title: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium" },
    { title: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/", difficulty: "Medium" },
    { title: "Reverse Nodes in k-Group", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", difficulty: "Hard" },
    { title: "Copy List with Random Pointer", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", difficulty: "Medium" },
    { title: "Design HashMap", link: "https://leetcode.com/problems/design-hashmap/", difficulty: "Easy" },
    { title: "Insert into a Sorted Circular Linked List", link: "https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/", difficulty: "Medium" },
    { title: "Design Browser History", link: "https://leetcode.com/problems/design-browser-history/", difficulty: "Medium" },
    { title: "Design HashSet", link: "https://leetcode.com/problems/design-hashset/", difficulty: "Easy" },
    { title: "Swap Nodes in Pairs", link: "https://leetcode.com/problems/swap-nodes-in-pairs/", difficulty: "Medium" },
    { title: "Delete Node in a Linked List", link: "https://leetcode.com/problems/delete-node-in-a-linked-list/", difficulty: "Medium" },
    { title: "Middle of the Linked List", link: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "Easy" },
    { title: "Remove Nth Node From End of List", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium" },
    { title: "Linked List Cycle II", link: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium" },
    { title: "Intersection of Two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/", difficulty: "Easy" },
    { title: "Convert Binary Number in a Linked List to Integer", link: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/", difficulty: "Easy" },
    { title: "Check linked list with a loop is palindrome or not", link: "https://www.geeksforgeeks.org/check-if-a-given-linked-list-is-palindrome/", difficulty: "Medium" },
  ],

  // 7. Recursion & Backtracking
  Recursion: [
    { title: "Pow(x, n)", link: "https://leetcode.com/problems/powx-n/", difficulty: "Medium" },
    { title: "N-th Tribonacci Number", link: "https://leetcode.com/problems/n-th-tribonacci-number/", difficulty: "Easy" },
    { title: "Subsets", link: "https://leetcode.com/problems/subsets/", difficulty: "Medium" },
    { title: "Permutations", link: "https://leetcode.com/problems/permutations/", difficulty: "Medium" },
    { title: "Power of Four", link: "https://leetcode.com/problems/power-of-four/", difficulty: "Easy" },
    { title: "Valid Palindrome", link: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy" },
    { title: "Power of Three", link: "https://leetcode.com/problems/power-of-three/", difficulty: "Easy" },
    { title: "Minimum Cost Climbing Stairs", link: "https://leetcode.com/problems/min-cost-climbing-stairs/", difficulty: "Easy" },
    { title: "Sum of All Subset XOR Totals", link: "https://leetcode.com/problems/sum-of-all-subset-xor-totals/", difficulty: "Easy" },
    { title: "Letter Combinations of a Phone Number", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "Medium" },
    { title: "N-Queen", link: "https://leetcode.com/problems/n-queens/", difficulty: "Hard" },
    { title: "Generate Parentheses", link: "https://leetcode.com/problems/generate-parentheses/", difficulty: "Medium" },
  ],

  // 8. Trees
  Trees: [
    { title: "Search in a Binary Search Tree", link: "https://leetcode.com/problems/search-in-a-binary-search-tree/", difficulty: "Easy" },
    { title: "Lowest Common Ancestor of a Binary Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium" },
    { title: "Serialize and Deserialize Binary Tree", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard" },
    { title: "Maximum Depth of N-ary Tree", link: "https://leetcode.com/problems/maximum-depth-of-n-ary-tree/", difficulty: "Easy" },
    { title: "Diameter of Binary Tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy" },
    { title: "Binary Tree Inorder Traversal", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "Easy" },
    { title: "N-ary Tree Postorder Traversal", link: "https://leetcode.com/problems/n-ary-tree-postorder-traversal/", difficulty: "Easy" },
    { title: "Average of Levels in Binary Tree", link: "https://leetcode.com/problems/average-of-levels-in-binary-tree/", difficulty: "Easy" },
    { title: "Validate Binary Search Tree", link: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium" },
    { title: "Minimum Distance Between BST Nodes", link: "https://leetcode.com/problems/minimum-distance-between-bst-nodes/", difficulty: "Easy" },
    { title: "N-ary Tree Level Order Traversal", link: "https://leetcode.com/problems/n-ary-tree-level-order-traversal/", difficulty: "Medium" },
    { title: "Vertical Order Traversal of a Binary Tree", link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", difficulty: "Hard" },
    { title: "N-ary Tree Preorder Traversal", link: "https://leetcode.com/problems/n-ary-tree-preorder-traversal/", difficulty: "Easy" },
    { title: "Kth Smallest Element in a BST", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "Medium" },
    { title: "Binary Tree Preorder Traversal", link: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "Easy" },
    { title: "Range Sum of BST", link: "https://leetcode.com/problems/range-sum-of-bst/", difficulty: "Easy" },
    { title: "Same Tree", link: "https://leetcode.com/problems/same-tree/", difficulty: "Easy" },
    { title: "Two Sum IV - Input is a BST", link: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", difficulty: "Easy" },
    { title: "Minimum Depth Of Binary Tree", link: "https://leetcode.com/problems/minimum-depth-of-binary-tree/", difficulty: "Easy" },
    { title: "Balanced Binary Tree", link: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy" },
    { title: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" },
    { title: "Construct Binary Tree from Preorder and Postorder Traversal", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/", difficulty: "Medium" },
    { title: "Convert Sorted Array to Binary Search Tree", link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", difficulty: "Easy" },
    { title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy" },
    { title: "Binary Tree Postorder Traversal", link: "https://leetcode.com/problems/binary-tree-postorder-traversal/", difficulty: "Easy" },
    { title: "Add One Row to Tree", link: "https://leetcode.com/problems/add-one-row-to-tree/", difficulty: "Medium" },
  ],

  // 9. Heaps / Priority Queue
  Heaps: [
    { title: "Merge k Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard" },
    { title: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard" },
    { title: "Sliding Window Median", link: "https://leetcode.com/problems/sliding-window-median/", difficulty: "Hard" },
    { title: "Top K Frequent Words", link: "https://leetcode.com/problems/top-k-frequent-words/", difficulty: "Medium" }
  ],

  // 10. Greedy
  Greedy: [
    { title: "Activity Selection", link: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", difficulty: "Medium" },
    { title: "Minimum Number of Platforms", link: "https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/", difficulty: "Medium" },
    { title: "Job Sequencing Problem", link: "https://www.geeksforgeeks.org/job-sequencing-problem/", difficulty: "Medium" },
    { title: "Huffman Coding", link: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/", difficulty: "Hard" }
  ],

  // 11. Binary Search
  BinarySearch: [
    { title: "Median Of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard" },
    { title: "Sqrt(x)", link: "https://leetcode.com/problems/sqrtx/", difficulty: "Easy" },
    { title: "Find Peak Element", link: "https://leetcode.com/problems/find-peak-element/", difficulty: "Medium" },
    { title: "Find First and Last Position of Element in Sorted Array", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium" },
    { title: "Search Insert Position", link: "https://leetcode.com/problems/search-insert-position/", difficulty: "Easy" },
    { title: "Find Minimum in Rotated Sorted Array", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium" },
    { title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium" },
    { title: "Fair Candy Swap", link: "https://leetcode.com/problems/fair-candy-swap/", difficulty: "Easy" },
    { title: "Minimum Number Of Days to Make m Bouquets", link: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", difficulty: "Medium" },
    { title: "Capacity To Ship Packages Within D Days", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", difficulty: "Medium" },
    { title: "Sum of Square Numbers", link: "https://leetcode.com/problems/sum-of-square-numbers/", difficulty: "Medium" },
    { title: "Koko Eating Bananas", link: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "Medium" },
  ],

  // 12. Segment Trees / Fenwick Trees (advanced DS)
  SegmentTrees: [
    { title: "Range Sum Query - Mutable", link: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "Medium" },
    { title: "Range Minimum Query", link: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/", difficulty: "Medium" },
    { title: "Fenwick Tree (Binary Indexed Tree)", link: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/", difficulty: "Medium" }
  ],

  // 13. Tries
  Tries: [
    { title: "Implement Trie", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "Medium" },
    { title: "Word Search II", link: "https://leetcode.com/problems/word-search-ii/", difficulty: "Hard" },
    { title: "Maximum XOR of Two Numbers", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", difficulty: "Medium" }
  ],

  // 14. Graphs (BFS/DFS basics)
  Graphs: [
    { title: "Number of Provinces", link: "https://leetcode.com/problems/number-of-provinces/", difficulty: "Medium" },
    { title: "Connected Components in Matrix (Islands)", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
    { title: "Rotten Oranges", link: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium" },
    { title: "Flood Fill", link: "https://leetcode.com/problems/flood-fill/", difficulty: "Easy" },
    { title: "01 Matrix (BFS)", link: "https://leetcode.com/problems/01-matrix/", difficulty: "Medium" },
    { title: "Surrounded Regions (DFS)", link: "https://leetcode.com/problems/surrounded-regions/", difficulty: "Medium" },
    { title: "Number of Enclaves (Multi-source BFS)", link: "https://leetcode.com/problems/number-of-enclaves/", difficulty: "Medium" },
    { title: "Word Ladder — I", link: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard" },
    { title: "Word Ladder — II", link: "https://leetcode.com/problems/word-ladder-ii/", difficulty: "Hard" },
    { title: "Bipartite Graph (DFS)", link: "https://leetcode.com/problems/is-graph-bipartite/", difficulty: "Medium" },
    { title: "Number of Distinct Islands (DFS)", link: "https://www.geeksforgeeks.org/number-of-distinct-islands/", difficulty: "Medium" },
    { title: "Find Eventual Safe States", link: "https://leetcode.com/problems/find-eventual-safe-states/", difficulty: "Medium" },
  ],

  // 15. Advanced Graphs
  AdvancedGraphs: [
    { title: "Bellman-Ford Algorithm", link: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", difficulty: "Medium" },
    { title: "Floyd-Warshall Algorithm", link: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", difficulty: "Medium" },
    { title: "Disjoint Set (Union Find)", link: "https://www.geeksforgeeks.org/disjoint-set-data-structures/", difficulty: "Medium" },
    { title: "Topological Sort", link: "https://www.geeksforgeeks.org/topological-sorting/", difficulty: "Medium" },
    { title: "Kahn's Algorithm", link: "https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/", difficulty: "Medium" },
    { title: "Minimum Spanning Tree (Kruskal/Prim)", link: "https://www.geeksforgeeks.org/minimum-spanning-tree-using-kruskals-algorithm/", difficulty: "Medium" },
    { title: "Prim's Algorithm", link: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/", difficulty: "Medium" },
    { title: "Dijkstra's Shortest Path", link: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", difficulty: "Medium" },
    { title: "Bridges in Graph (Tarjan’s Algorithm)", link: "https://www.geeksforgeeks.org/bridge-in-a-graph/", difficulty: "Hard" },
    { title: "Articulation Points", link: "https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/", difficulty: "Hard" },
    { title: "Alien Dictionary", link: "https://www.geeksforgeeks.org/alien-dictionary/", difficulty: "Hard" }
  ],

  // 16. Dynamic Programming (after mastering recursion & graphs)
  DynamicProgramming: [
    { title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy" },
    { title: "Fibonacci Number", link: "https://leetcode.com/problems/fibonacci-number/", difficulty: "Easy" },
    { title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy" },
    { title: "Edit Distance", link: "https://leetcode.com/problems/edit-distance/", difficulty: "Hard" },
    { title: "Best Time to Buy and Sell Stock II", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", difficulty: "Medium" },
    { title: "House Robber", link: "https://leetcode.com/problems/house-robber/", difficulty: "Medium" },
    { title: "Coin Change II", link: "https://leetcode.com/problems/coin-change-2/", difficulty: "Medium" },
    { title: "House Robber II", link: "https://leetcode.com/problems/house-robber-ii/", difficulty: "Medium" },
    { title: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "Medium" },
    { title: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium" },
    { title: "Jump Game", link: "https://leetcode.com/problems/jump-game/", difficulty: "Medium" },
    { title: "Jump Game II", link: "https://leetcode.com/problems/jump-game-ii/", difficulty: "Medium" },
    { title: "Partition Equal Subset Sum", link: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium" },
    { title: "Word Break", link: "https://leetcode.com/problems/word-break/", difficulty: "Medium" },
    { title: "0/1 Knapsack (classic)", link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", difficulty: "Medium" },
    { title: "Stone Game IV", link: "https://leetcode.com/problems/stone-game-iv/", difficulty: "Hard" },
    { title: "Stone Game VIII", link: "https://leetcode.com/problems/stone-game-viii/", difficulty: "Hard" },
    { title: "Stone Game III", link: "https://leetcode.com/problems/stone-game-iii/", difficulty: "Hard" },
    { title: "Stone Game V", link: "https://leetcode.com/problems/stone-game-v/", difficulty: "Hard" },
    { title: "Stone Game VII", link: "https://leetcode.com/problems/stone-game-vii/", difficulty: "Medium" },
    { title: "Divisor Game", link: "https://leetcode.com/problems/divisor-game/", difficulty: "Easy" },
    { title: "Stone Game", link: "https://leetcode.com/problems/stone-game/", difficulty: "Medium" },
  ],

  // 17. Bit Manipulation
  BitManipulation: [
    { title: "Single Number", link: "https://leetcode.com/problems/single-number/", difficulty: "Easy" },
    { title: "Single Number III", link: "https://leetcode.com/problems/single-number-iii/", difficulty: "Medium" },
    { title: "Subsets using Bitmask", link: "https://leetcode.com/problems/subsets/", difficulty: "Medium" },
    { title: "Power of Two", link: "https://leetcode.com/problems/power-of-two/", difficulty: "Easy" },
    { title: "Count Set Bits", link: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/", difficulty: "Easy" }
  ],

  // 18. Math / Number Theory
  Math: [
    { title: "Find the Pivot Integer", link: "https://leetcode.com/problems/find-the-pivot-integer/", difficulty: "Easy" },
    { title: "Count the Digits That Divide a Number", link: "https://leetcode.com/problems/count-the-digits-that-divide-a-number/", difficulty: "Easy" },
    { title: "Number of Steps to Reduce a Number to Zero", link: "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/", difficulty: "Easy" },
    { title: "Three Divisors", link: "https://leetcode.com/problems/three-divisors/", difficulty: "Easy" },
    { title: "Sum Multiples", link: "https://leetcode.com/problems/sum-multiples/", difficulty: "Easy" },
    { title: "Minimum Sum of Four Digit Number After Splitting Digits", link: "https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/", difficulty: "Easy" },
    { title: "Find Greatest Common Divisor of Array", link: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/", difficulty: "Easy" },
    { title: "Number of Good Pairs", link: "https://leetcode.com/problems/number-of-good-pairs/", difficulty: "Easy" },
    { title: "Count of Matches in Tournament", link: "https://leetcode.com/problems/count-of-matches-in-tournament/", difficulty: "Easy" },
    { title: "Subtract the Product and Sum of Digits of an Integer", link: "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/", difficulty: "Easy" },
  ],
};
