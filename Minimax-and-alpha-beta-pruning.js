class TreeNode {
    constructor(value, childNodes) {
        this.value = value;
        this.childNodes = childNodes;
    }
}

function runMinimax(root, depth, maxNode) {
    if (depth === 0 || root.childNodes.length === 0) {
        return root.value;
    }

    if (maxNode) {
        let value = -Infinity;
        for (let node of root.childNodes) {
            value = Math.max(value, runMinimax(node, depth - 1, false));
        }
        return value;
    } else {
        let value = Infinity;
        for (let node of root.childNodes) {
            value = Math.min(value, runMinimax(node, depth - 1, true));
        }
        return value;
    }
}

function runAlphaBetaPruning(root, depth, maxNode, alpha, beta) {
    if (depth === 0 || root.childNodes.length === 0) {
        return root.value;
    }

    if (maxNode) {
        let value = -Infinity;
        for (let node of root.childNodes) {
            miniVal = runMinimax(node, depth - 1, false, alpha, beta)
            value = Math.max(value, miniVal);
            alpha = Math.max(alpha, miniVal);
            if (beta <= alpha) {
                break;
            }
        }
        return value;
    } else {
        let value = Infinity;
        for (let node of root.childNodes) {
            miniVal = runMinimax(node, depth - 1, true, alpha, beta);
            value = Math.min(value, miniVal);
            beta = Math.min(beta, miniVal);
            if (beta <= alpha) {
                break;
            }
        }
        return value;
    }
}

// 2-ply
const twoPly = new TreeNode(null, [new TreeNode(null, [new TreeNode(6, []), new TreeNode(1, [])]), new TreeNode(null, [new TreeNode(4, [])])]);

// 4-ply
// Test Case 1
let fourPly1 = new TreeNode(
    null,
    [
        new TreeNode(null, [
            new TreeNode(62, []),
            new TreeNode(-5, []),
            new TreeNode(11, []),
            new TreeNode(-9, [])
        ]),
        new TreeNode(null, [
            new TreeNode(34, []),
            new TreeNode(99, []),
            new TreeNode(-22, []),
            new TreeNode(-77, [])
        ]),
        new TreeNode(null, [
            new TreeNode(91, []),
            new TreeNode(90, []),
            new TreeNode(-9, []),
            new TreeNode(22, [])
        ]),
        new TreeNode(null, [
            new TreeNode(41, []),
            new TreeNode(27, []),
            new TreeNode(81, []),
            new TreeNode(-2, [])
        ])
    ]
);

// Test Case 2
let fourPly2 = new TreeNode(
    null,
    [
        new TreeNode(null, [
            new TreeNode(-43, []),
            new TreeNode(-15, []),
            new TreeNode(88, []),
            new TreeNode(95, [])
        ]),
        new TreeNode(null, [
            new TreeNode(98, []),
            new TreeNode(17, []),
            new TreeNode(16, []),
            new TreeNode(99, [])
        ]),
        new TreeNode(null, [
            new TreeNode(-59, []),
            new TreeNode(-52, []),
            new TreeNode(43, []),
            new TreeNode(72, [])
        ]),
        new TreeNode(null, [
            new TreeNode(13, []),
            new TreeNode(87, []),
            new TreeNode(29, []),
            new TreeNode(62, [])
        ])
    ]
);

// Test Case 3
let fourPly3 = new TreeNode(
    null,
    [
        new TreeNode(null, [
            new TreeNode(62, []),
            new TreeNode(57, []),
            new TreeNode(18, []),
            new TreeNode(16, [])
        ]),
        new TreeNode(null, [
            new TreeNode(43, []),
            new TreeNode(31, []),
            new TreeNode(21, []),
            new TreeNode(12, [])
        ]),
        new TreeNode(null, [
            new TreeNode(76, []),
            new TreeNode(-85, []),
            new TreeNode(165, []),
            new TreeNode(143, [])
        ]),
        new TreeNode(null, [
            new TreeNode(87, []),
            new TreeNode(21, []),
            new TreeNode(26, []),
            new TreeNode(91, [])
        ])
    ]
);

const minimaxResult = runMinimax(twoPly, 3, true);
const alphaBetaPruning =  runAlphaBetaPruning(twoPly, 3, true, -Infinity, Infinity);
console.log("Minimax Result: " + minimaxResult);
console.log("Alpha-Beta Pruning Result: " + alphaBetaPruning);

console.log("4-ply Cases...");
console.log("Alpha-Beta Pruning Test Case 1: " + runAlphaBetaPruning(fourPly1, 4, true, -Infinity, Infinity));
console.log("Alpha-Beta Pruning Test Case 2: " + runAlphaBetaPruning(fourPly2, 4, true, -Infinity, Infinity));
console.log("Alpha-Beta Pruning Test Case 3: " + runAlphaBetaPruning(fourPly3, 4, true, -Infinity, Infinity));
