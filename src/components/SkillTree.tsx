import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Monitor,
  Settings,
  GitBranch,
  Plug,
  Code,
  File,
  Mail,
  Calendar,
  Table,
  Globe,
  MonitorPlay,
  Layout,
  FileText,
  BarChart3,
  Search,
  X,
} from 'lucide-react'
// --- Types ---
type BranchColor = 'indigo' | 'sky' | 'orange'
interface NodeData {
  id: string
  title: string
  description: string
  icon: React.ElementType
}
interface BranchData {
  id: string
  title: string
  color: BranchColor
  hex: string
  nodes: NodeData[]
}
interface ModuleData {
  id: number
  title: string
  activeNodeIds: string[]
}
const MODULES: ModuleData[] = [
  {
    id: 1,
    title: 'Meeting Notes',
    activeNodeIds: ['t1', 't2', 'd1', 'k3', 'k1'],
  },
  {
    id: 2,
    title: 'Voice Notes',
    activeNodeIds: ['t3', 'd1', 'k3'],
  },
  {
    id: 3,
    title: 'Morning Briefing',
    activeNodeIds: ['t5', 'd2', 'd3', 'k3'],
  },
  {
    id: 4,
    title: 'Landing Page',
    activeNodeIds: ['t6', 't4', 'd5', 'k2'],
  },
  {
    id: 5,
    title: 'Legal Shield',
    activeNodeIds: ['t3', 'd1', 'k5'],
  },
  {
    id: 6,
    title: 'Stakeholder Report',
    activeNodeIds: ['t5', 't4', 'd4', 'k4', 'k1', 'k3'],
  },
]
// --- Data ---
const SKILL_TREE_DATA: BranchData[] = [
  {
    id: 'tech',
    title: 'TECHNOLOGY',
    color: 'indigo',
    hex: '#4F46E5',
    nodes: [
      {
        id: 't1',
        title: 'Claude Code',
        description:
          'AI assistant for writing and editing code directly in the terminal. Works with your entire project context.',
        icon: Terminal,
      },
      {
        id: 't2',
        title: 'VS Code',
        description:
          'Code editor with AI extensions (Copilot, Cursor). Primary development environment with intelligent suggestions.',
        icon: Monitor,
      },
      {
        id: 't3',
        title: 'Skill',
        description:
          'A set of specialized agent capabilities — from text analysis to code generation. Defines what the agent can do.',
        icon: Settings,
      },
      {
        id: 't4',
        title: 'Git',
        description:
          'Version control system. The agent can create commits, branches, and manage repositories.',
        icon: GitBranch,
      },
      {
        id: 't5',
        title: 'API/MCP',
        description:
          'Interfaces for connecting to external services. MCP (Model Context Protocol) — a standard for tool interaction.',
        icon: Plug,
      },
      {
        id: 't6',
        title: 'Writing Code',
        description:
          'Generating, refactoring, and debugging code across various programming languages.',
        icon: Code,
      },
    ],
  },
  {
    id: 'data',
    title: 'DATA TYPES',
    color: 'sky',
    hex: '#0EA5E9',
    nodes: [
      {
        id: 'd1',
        title: 'Files',
        description:
          'Working with files: reading, creating, and editing documents in various formats (PDF, DOCX, TXT).',
        icon: File,
      },
      {
        id: 'd2',
        title: 'Email',
        description:
          'Reading, analyzing, and sending email. Automatic processing of incoming messages.',
        icon: Mail,
      },
      {
        id: 'd3',
        title: 'Calendar',
        description:
          'Schedule management: creating events, reminders, availability analysis, and meeting planning.',
        icon: Calendar,
      },
      {
        id: 'd4',
        title: 'Spreadsheets',
        description:
          'Working with tabular data: Excel, Google Sheets. Formulas, pivot tables, visualization.',
        icon: Table,
      },
      {
        id: 'd5',
        title: 'Web',
        description:
          'Searching for information online, parsing web pages, monitoring website changes.',
        icon: Globe,
      },
    ],
  },
  {
    id: 'tasks',
    title: 'TASKS',
    color: 'orange',
    hex: '#F97316',
    nodes: [
      {
        id: 'k1',
        title: 'Presentations',
        description:
          'Automatic slide generation with design, text, and visualizations based on data.',
        icon: MonitorPlay,
      },
      {
        id: 'k2',
        title: 'Landing Pages',
        description:
          'Web page development: from design to working code. HTML, CSS, React components.',
        icon: Layout,
      },
      {
        id: 'k3',
        title: 'Documents',
        description:
          'Generating structured documents: reports, contracts, technical specifications.',
        icon: FileText,
      },
      {
        id: 'k4',
        title: 'Data Analysis',
        description:
          'Statistical analysis, chart building, identifying trends and anomalies in data.',
        icon: BarChart3,
      },
      {
        id: 'k5',
        title: 'Document Analysis',
        description:
          'Extracting key information from documents, comparing versions, summarization.',
        icon: Search,
      },
    ],
  },
]
// --- Animation Variants ---
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
} as const
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
}
const rootVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
}
// --- Components ---
export function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<{
    node: NodeData
    branch: BranchData
    index: number
  } | null>(null)
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const activeNodeIds = activeModule
    ? MODULES.find((m) => m.id === activeModule)?.activeNodeIds || []
    : []
  return (
    <div className="min-h-screen bg-[#F7F8FC] dot-grid text-[#0F172A] font-sans py-20 px-4 sm:px-8 overflow-x-hidden relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10 flex flex-col items-center">
          <h1 className="text-[26px] font-semibold tracking-tight text-[#0F172A] mb-8">
            AI AGENT SKILL TREE
          </h1>

          {/* Faint horizontal rule */}
          <div className="w-64 h-px bg-slate-200 mb-8 absolute top-10"></div>

          {/* Root Node */}
          <motion.div
            variants={rootVariants}
            initial="hidden"
            animate="show"
            className="inline-flex items-center justify-center bg-[#0F172A] text-white px-8 py-3.5 rounded-xl relative z-10"
            style={{
              boxShadow:
                '0 0 20px rgba(79,70,229,0.15), 0 0 40px rgba(79,70,229,0.05)',
              border: '1px solid rgba(79,70,229,0.2)',
            }}
          >
            {/* Active Ping Dot */}
            <div className="absolute -left-1.5 -top-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-[#0F172A]"></span>
            </div>
            <span className="text-[16px] font-bold tracking-wider">
              AI AGENT
            </span>
          </motion.div>
        </div>

        {/* Tree Structure */}
        <div className="relative">
          {/* Desktop Connecting Lines (Root to Branches) */}
          <div className="hidden md:block relative h-12 w-full -mt-16 mb-4 z-0">
            <svg className="absolute inset-0 w-full h-full overflow-visible">
              {/* Vertical line from root */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="24"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
                className="animate-flow-down"
              />
              {/* Horizontal line connecting columns */}
              <line
                x1="16.666%"
                y1="24"
                x2="83.333%"
                y2="24"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
                className="animate-flow-down"
              />
              {/* Three vertical drops to branch headers */}
              <line
                x1="16.666%"
                y1="24"
                x2="16.666%"
                y2="48"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
                className="animate-flow-down"
              />
              <line
                x1="50%"
                y1="24"
                x2="50%"
                y2="48"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
                className="animate-flow-down"
              />
              <line
                x1="83.333%"
                y1="24"
                x2="83.333%"
                y2="48"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeDasharray="4 4"
                className="animate-flow-down"
              />

              {/* Junction Dots */}
              <circle
                cx="50%"
                cy="24"
                r="3"
                fill="#64748B"
                fillOpacity="0.6"
                className="animate-pulse-dot"
                style={{
                  transformOrigin: '50% 24px',
                }}
              />
              <circle
                cx="16.666%"
                cy="24"
                r="3"
                fill="#64748B"
                fillOpacity="0.6"
                className="animate-pulse-dot"
                style={{
                  transformOrigin: '16.666% 24px',
                }}
              />
              <circle
                cx="83.333%"
                cy="24"
                r="3"
                fill="#64748B"
                fillOpacity="0.6"
                className="animate-pulse-dot"
                style={{
                  transformOrigin: '83.333% 24px',
                }}
              />
            </svg>
          </div>

          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {SKILL_TREE_DATA.map((branch) => (
              <motion.div
                key={branch.id}
                className="flex flex-col"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {/* Branch Header */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-full py-2 px-4 flex items-center justify-between relative backdrop-blur-md z-10"
                  style={{
                    backgroundColor: `${branch.hex}14`,
                    border: `1px solid ${branch.hex}33`, // 20% opacity
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: branch.hex,
                      }}
                    ></div>
                    <h2 className="text-[13px] font-semibold uppercase tracking-widest text-[#0F172A]">
                      {branch.title}
                    </h2>
                  </div>
                  <span
                    className="font-mono text-[11px] font-medium"
                    style={{
                      color: branch.hex,
                    }}
                  >
                    {branch.nodes.length.toString().padStart(2, '0')}
                  </span>
                </motion.div>

                {/* Nodes List with Connecting Lines */}
                <div className="relative mt-6">
                  {/* Vertical animated dashed line for the column */}
                  <svg className="absolute left-[23px] top-[10px] bottom-[28px] w-[2px] h-[calc(100%-38px)] overflow-visible z-0">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100%"
                      stroke={branch.hex}
                      strokeWidth="1.5"
                      strokeOpacity="0.25"
                      strokeDasharray="4 4"
                      className="animate-flow-down"
                    />
                  </svg>

                  <div className="flex flex-col gap-3">
                    {branch.nodes.map((node, index) => (
                      <motion.div
                        key={node.id}
                        variants={itemVariants}
                        className="relative pl-12"
                      >
                        {/* Horizontal solid tick for each node */}
                        <div
                          className="absolute left-[23px] top-1/2 w-[25px] h-[1.5px] -translate-y-1/2 z-0"
                          style={{
                            backgroundColor: `${branch.hex}40`,
                          }}
                        ></div>

                        {/* Junction Dot at node connection */}
                        <div
                          className="absolute left-[20px] top-1/2 w-2 h-2 rounded-full -translate-y-1/2 z-10 animate-pulse-dot"
                          style={{
                            backgroundColor: `${branch.hex}99`,
                          }}
                        ></div>

                        {/* Node Card */}
                        <button
                          onClick={() =>
                            setSelectedNode({
                              node,
                              branch,
                              index,
                            })
                          }
                          className={`w-full flex items-center p-2.5 bg-white/70 backdrop-blur-sm rounded-xl relative group text-left transition-all duration-300 ease-out hover:bg-white/90 focus:outline-none z-10 ${activeModule && !activeNodeIds.includes(node.id) ? 'opacity-30 grayscale hover:opacity-50' : 'opacity-100'}`}
                          style={{
                            border: '1px solid rgba(0,0,0,0.06)',
                            boxShadow:
                              '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)',
                          }}
                        >
                          {/* Hover Border Glow */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            style={{
                              border: `1px solid ${branch.hex}40`,
                              boxShadow: `0 0 12px ${branch.hex}15`,
                            }}
                          ></div>

                          {/* Left Border Accent */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-colors duration-200"
                            style={{
                              backgroundColor: branch.hex,
                            }}
                          ></div>

                          <div className="flex items-center gap-3 w-full pl-1">
                            {/* Index Number */}
                            <span className="font-mono text-[11px] text-slate-400 font-medium tracking-wider w-4">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>

                            {/* Icon */}
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                              style={{
                                backgroundColor: `${branch.hex}14`,
                                color: branch.hex,
                              }}
                            >
                              <node.icon size={16} strokeWidth={2.5} />
                            </div>

                            {/* Label */}
                            <span className="text-[14px] font-medium text-[#0F172A] group-hover:text-black transition-colors truncate">
                              {node.title}
                            </span>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Module Switcher */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {MODULES.map((mod) => {
            const isActive = activeModule === mod.id
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(isActive ? null : mod.id)}
                className={`w-9 h-9 rounded-lg font-mono text-[12px] font-bold transition-all duration-200 ${isActive ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white/60 text-slate-500 border border-slate-200/60 hover:bg-white hover:text-slate-700 hover:shadow-sm'}`}
              >
                {mod.id}
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Popup Modal */}
      <AnimatePresence>
        {selectedNode && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-40"
              onClick={() => setSelectedNode(null)}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 10,
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl w-full max-w-md overflow-hidden pointer-events-auto relative"
                style={{
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow:
                    '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Accent Line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    backgroundColor: selectedNode.branch.hex,
                  }}
                />

                <div className="p-6 sm:p-8">
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors group"
                  >
                    <X
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>

                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${selectedNode.branch.hex}1A`,
                      }}
                    >
                      <span
                        className="font-mono text-[10px] font-medium"
                        style={{
                          color: selectedNode.branch.hex,
                        }}
                      >
                        {(selectedNode.index + 1).toString().padStart(2, '0')}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          color: selectedNode.branch.hex,
                        }}
                      >
                        {selectedNode.branch.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: `${selectedNode.branch.hex}14`,
                        color: selectedNode.branch.hex,
                        border: `1px solid ${selectedNode.branch.hex}33`,
                      }}
                    >
                      <selectedNode.node.icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#0F172A] leading-tight">
                      {selectedNode.node.title}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-[1.7] text-[#64748B]">
                    {selectedNode.node.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
