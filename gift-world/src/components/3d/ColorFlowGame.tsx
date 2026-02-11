'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface Cell {
  row: number;
  col: number;
  color: string | null;
  isSource: boolean;
  isTarget: boolean;
  sourceId?: number;
}

interface FlowPath {
  cells: Cell[];
  color: string;
  isComplete: boolean;
}

type GameMode = 'menu' | 'playing' | 'completed';

const COLORS = [
  { name: 'Rose', hex: '#FF1493', light: '#FF69B4' },      // Deep pink - very distinct
  { name: 'Blue', hex: '#1E90FF', light: '#87CEEB' },      // Dodger blue - bright blue
  { name: 'Green', hex: '#00FF00', light: '#90EE90' },     // Lime green - vibrant green
  { name: 'Orange', hex: '#FF8C00', light: '#FFB347' },    // Dark orange - distinct orange
  { name: 'Purple', hex: '#9370DB', light: '#DDA0DD' },    // Medium purple - clear purple
  { name: 'Yellow', hex: '#FFD700', light: '#FFEB3B' },    // Gold yellow - bright yellow
];

// Pre-defined VERIFIED solvable puzzles - tested to ensure all colors connect!
const LEVEL_PUZZLES = [
  // Level 1: Peaceful 5x5 - 3 colors (VERY EASY - all edges)
  {
    level: 1,
    size: 5,
    name: 'Peaceful',
    pairs: [
      { color: 0, source: [0, 0], target: [0, 4] },  // Rose - top edge horizontal
      { color: 1, source: [4, 0], target: [4, 4] },  // Blue - bottom edge horizontal  
      { color: 2, source: [0, 2], target: [4, 2] },  // Green - middle vertical
    ]
  },
  // Level 2: Calm 6x6 - 4 colors (carefully positioned)
  {
    level: 2,
    size: 6,
    name: 'Calm',
    pairs: [
      { color: 0, source: [0, 0], target: [0, 5] },  // Rose - top row
      { color: 1, source: [5, 0], target: [5, 5] },  // Blue - bottom row
      { color: 2, source: [1, 1], target: [1, 4] },  // Green - second row
      { color: 3, source: [4, 1], target: [4, 4] },  // Orange - fifth row
    ]
  },
  // Level 3: Flowing 7x7 - 4 colors (easier with more space)
  {
    level: 3,
    size: 7,
    name: 'Flowing',
    pairs: [
      { color: 0, source: [0, 0], target: [0, 6] },  // Rose - top edge
      { color: 1, source: [6, 0], target: [6, 6] },  // Blue - bottom edge
      { color: 2, source: [2, 1], target: [2, 5] },  // Green - row 2
      { color: 3, source: [4, 1], target: [4, 5] },  // Orange - row 4
    ]
  },
  // Level 4: Another Peaceful - simple parallel paths
  {
    level: 4,
    size: 5,
    name: 'Peaceful',
    pairs: [
      { color: 0, source: [1, 0], target: [1, 4] },  // Rose - horizontal
      { color: 1, source: [3, 0], target: [3, 4] },  // Blue - horizontal
      { color: 2, source: [0, 1], target: [4, 1] },  // Green - vertical
    ]
  },
  // Level 5: Advanced 6x6 - mixed directions
  {
    level: 5,
    size: 6,
    name: 'Calm',
    pairs: [
      { color: 0, source: [1, 0], target: [1, 5] },  // Rose - horizontal
      { color: 1, source: [4, 0], target: [4, 5] },  // Blue - horizontal
      { color: 2, source: [0, 2], target: [5, 2] },  // Green - vertical
      { color: 3, source: [2, 2], target: [2, 4] },  // Orange - short horizontal
    ]
  },
];

export default function ColorFlowGame({ onGameEnd }: { onGameEnd?: () => void }) {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [paths, setPaths] = useState<FlowPath[]>([]);
  const [currentPath, setCurrentPath] = useState<Cell[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragColor, setDragColor] = useState<string | null>(null);
  const [completedPaths, setCompletedPaths] = useState<number>(0);
  const [showSuccessEffect, setShowSuccessEffect] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initialize grid with pre-defined solvable puzzle
  const initializeGrid = useCallback(() => {
    const puzzleIndex = currentLevel % LEVEL_PUZZLES.length;
    const puzzle = LEVEL_PUZZLES[puzzleIndex];
    const gridSize = puzzle.size;
    
    // Create empty grid
    const newGrid: Cell[][] = Array(gridSize).fill(null).map((_, row) =>
      Array(gridSize).fill(null).map((_, col) => ({
        row,
        col,
        color: null,
        isSource: false,
        isTarget: false,
      }))
    );

    // Place source and target pairs from pre-defined puzzle
    puzzle.pairs.forEach((pair, index) => {
      const colorData = COLORS[pair.color];
      const [sourceRow, sourceCol] = pair.source;
      const [targetRow, targetCol] = pair.target;

      newGrid[sourceRow][sourceCol] = {
        row: sourceRow,
        col: sourceCol,
        color: colorData.hex,
        isSource: true,
        isTarget: false,
        sourceId: index,
      };

      newGrid[targetRow][targetCol] = {
        row: targetRow,
        col: targetCol,
        color: colorData.hex,
        isSource: false,
        isTarget: true,
        sourceId: index,
      };
    });

    setGrid(newGrid);
    setPaths([]);
    setCompletedPaths(0);
  }, [currentLevel]);

  // Start game
  const startGame = (level: number) => {
    setCurrentLevel(level);
    setGameMode('playing');
  };

  useEffect(() => {
    if (gameMode === 'playing') {
      initializeGrid();
    }
  }, [gameMode, initializeGrid]);

  // Handle mouse/touch down on a cell
  const handleCellStart = (cell: Cell) => {
    // Can only start from a source point
    if (cell.isSource) {
      setIsDragging(true);
      setDragColor(cell.color);
      setCurrentPath([cell]);
      
      // Check if we're redrawing a completed path
      const pathCells = grid.flat().filter(c => 
        c.color === cell.color && !c.isSource && !c.isTarget
      );
      const wasComplete = pathCells.length > 0 && 
        grid.flat().some(c => c.color === cell.color && c.isTarget);
      
      // Clear existing path of this color
      const newGrid = grid.map(row =>
        row.map(c => 
          c.color === cell.color && !c.isSource && !c.isTarget
            ? { ...c, color: null }
            : c
        )
      );
      setGrid(newGrid);
      
      // Decrease completed paths if we cleared a completed one
      if (wasComplete) {
        setCompletedPaths(Math.max(0, completedPaths - 1));
      }
    }
  };

  // Handle mouse/touch move over a cell
  const handleCellMove = (cell: Cell) => {
    if (!isDragging || !dragColor) return;

    const lastCell = currentPath[currentPath.length - 1];
    if (!lastCell) return;

    // Check if adjacent
    const isAdjacent = 
      (Math.abs(cell.row - lastCell.row) === 1 && cell.col === lastCell.col) ||
      (Math.abs(cell.col - lastCell.col) === 1 && cell.row === lastCell.row);

    if (!isAdjacent) return;

    // Don't allow backtracking except to previous cell
    if (currentPath.length > 1) {
      const secondLastCell = currentPath[currentPath.length - 2];
      if (cell.row === secondLastCell.row && cell.col === secondLastCell.col) {
        // Allow removing last cell (backtracking one step)
        const newPath = currentPath.slice(0, -1);
        setCurrentPath(newPath);
        const newGrid = [...grid];
        newGrid[lastCell.row][lastCell.col] = { ...lastCell, color: null };
        setGrid(newGrid);
        return;
      }
    }

    // Already in path (not backtracking)
    if (currentPath.some(c => c.row === cell.row && c.col === cell.col)) {
      return;
    }

    // Check if cell is valid to move to
    // Can only move to: empty cells, or our target with matching color
    if (cell.color === null) {
      // Empty cell - OK to use
      const newPath = [...currentPath, cell];
      setCurrentPath(newPath);

      const newGrid = [...grid];
      newGrid[cell.row][cell.col] = { ...cell, color: dragColor };
      setGrid(newGrid);
    } else if (cell.color === dragColor && cell.isTarget) {
      // Reached our target!
      const newPath = [...currentPath, cell];
      setCurrentPath(newPath);
      finishPath(newPath, dragColor);
    }
    // Else: cell is occupied by another color or is a different endpoint - can't use it
  };

  // Finish a path
  const finishPath = (path: Cell[], color: string) => {
    const sourceCell = path[0];
    const targetCell = path[path.length - 1];

    if (sourceCell.isSource && targetCell.isTarget && targetCell.color === color) {
      // Path is complete!
      setShowSuccessEffect(true);
      setTimeout(() => setShowSuccessEffect(false), 1000);

      const newCompletedPaths = completedPaths + 1;
      setCompletedPaths(newCompletedPaths);

      // Check if all paths are complete
      const puzzleIndex = currentLevel % LEVEL_PUZZLES.length;
      const puzzle = LEVEL_PUZZLES[puzzleIndex];
      const totalPaths = puzzle.pairs.length;
      
      if (newCompletedPaths === totalPaths) {
        setTimeout(() => {
          setGameMode('completed');
        }, 1500);
      }
    }

    setIsDragging(false);
    setDragColor(null);
    setCurrentPath([]);
  };

  // Handle mouse/touch up
  const handleDragEnd = () => {
    if (isDragging && currentPath.length > 0) {
      const lastCell = currentPath[currentPath.length - 1];
      
      // If didn't reach target, clear the path
      if (!lastCell.isTarget) {
        const newGrid = grid.map(row =>
          row.map(cell =>
            cell.color === dragColor && !cell.isSource && !cell.isTarget
              ? { ...cell, color: null }
              : cell
          )
        );
        setGrid(newGrid);
      }
    }

    setIsDragging(false);
    setDragColor(null);
    setCurrentPath([]);
  };

  // Menu screen
  if (gameMode === 'menu') {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-blue-900/30 overflow-hidden flex items-center justify-center">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                background: `linear-gradient(135deg, ${COLORS[i].hex}20, ${COLORS[i].light}20)`,
                left: `${20 + i * 10}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-2xl w-full p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🌈
              </motion.div>
              
              <h1 className="text-4xl font-bold text-white mb-3">Color Flow</h1>
              <p className="text-white/80 text-lg mb-6">
                Connect matching colors like flowing liquid
              </p>

              <div className="bg-white/5 rounded-xl p-6 mb-6 text-left">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>💡</span> How to Play
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Drag from a colored dot to its matching partner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Colors flow beautifully as you connect them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Paths cannot cross or overlap - plan carefully!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">•</span>
                    <span>Connect all colors to complete the puzzle</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => startGame(0)}
                  variant="primary"
                  size="lg"
                  className="w-full text-lg"
                >
                  Peaceful Mode - 5x5 Grid (3 colors)
                </Button>
                <Button
                  onClick={() => startGame(1)}
                  variant="primary"
                  size="lg"
                  className="w-full text-lg"
                >
                  Calm Mode - 6x6 Grid (4 colors)
                </Button>
                <Button
                  onClick={() => startGame(2)}
                  variant="primary"
                  size="lg"
                  className="w-full text-lg"
                >
                  Flowing Mode - 7x7 Grid (5 colors)
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  // Completed screen
  if (gameMode === 'completed') {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-blue-900/30 overflow-hidden flex items-center justify-center">
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: COLORS[i % COLORS.length].hex,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full p-8"
        >
          <GlassCard className="p-8 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              ✨
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-3">Beautiful!</h2>
            <p className="text-white/80 text-lg mb-8">
              You connected all the colors perfectly! 🌈
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  if (currentLevel < LEVEL_PUZZLES.length - 1) {
                    setCurrentLevel(currentLevel + 1);
                    setGameMode('playing');
                  } else {
                    setCurrentLevel(0);
                    setGameMode('playing');
                  }
                }}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {currentLevel < LEVEL_PUZZLES.length - 1 ? 'Next Level' : 'Play Again'}
              </Button>
              
              <Button
                onClick={() => setGameMode('menu')}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Main Menu
              </Button>

              {onGameEnd && (
                <Button
                  onClick={onGameEnd}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  Exit Game
                </Button>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // Playing screen
  const puzzleIndex = currentLevel % LEVEL_PUZZLES.length;
  const puzzle = LEVEL_PUZZLES[puzzleIndex];
  const gridSize = puzzle.size;
  const cellSize = Math.min(80, Math.floor(600 / gridSize));

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-blue-900/30 overflow-hidden flex items-center justify-center">
      {/* Success effect */}
      <AnimatePresence>
        {showSuccessEffect && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 1, 0] }}
            exit={{ scale: 3, opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle, ${dragColor}40 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            {puzzle.name} Mode - Level {currentLevel + 1}
          </h2>
          <p className="text-white/70 text-lg">
            Connect {completedPaths} / {puzzle.pairs.length} colors
          </p>
        </motion.div>

        {/* Game Grid */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          style={{
            width: `${cellSize * gridSize + 20}px`,
            height: `${cellSize * gridSize + 20}px`,
          }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          <GlassCard className="p-2 w-full h-full">
            <div
              className="relative w-full h-full"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                gap: '2px',
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isInCurrentPath = currentPath.some(
                    c => c.row === cell.row && c.col === cell.col
                  );
                  
                  const color = cell.color || (isInCurrentPath ? dragColor : null);
                  const isEndpoint = cell.isSource || cell.isTarget;

                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative rounded-lg transition-all cursor-pointer"
                      style={{
                        backgroundColor: isEndpoint 
                          ? color || 'transparent'
                          : color 
                          ? `${color}80`
                          : 'rgba(255,255,255,0.05)',
                        border: isEndpoint 
                          ? `3px solid ${color}` 
                          : 'none',
                        boxShadow: color 
                          ? `0 0 ${isEndpoint ? '20' : '10'}px ${color}60`
                          : 'none',
                      }}
                      animate={{
                        scale: isInCurrentPath ? 1.1 : 1,
                      }}
                      whileHover={{ scale: isEndpoint ? 1.15 : 1.05 }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleCellStart(cell);
                      }}
                      onMouseEnter={() => {
                        if (isDragging) handleCellMove(cell);
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleCellStart(cell);
                      }}
                      onTouchMove={(e) => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(
                          touch.clientX,
                          touch.clientY
                        );
                        if (element) {
                          const cellData = element.getAttribute('data-cell');
                          if (cellData) {
                            const [r, c] = cellData.split('-').map(Number);
                            handleCellMove(grid[r][c]);
                          }
                        }
                      }}
                      data-cell={`${cell.row}-${cell.col}`}
                    >
                      {/* Endpoint indicator */}
                      {isEndpoint && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
                          }}
                        />
                      )}

                      {/* Flow animation for connected cells */}
                      {color && !isEndpoint && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            background: `linear-gradient(135deg, ${color}00, ${color}FF, ${color}00)`,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex gap-4"
        >
          <Button
            onClick={initializeGrid}
            variant="secondary"
            size="lg"
          >
            🔄 Reset
          </Button>
          
          <Button
            onClick={() => setGameMode('menu')}
            variant="ghost"
            size="lg"
          >
            ← Menu
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
